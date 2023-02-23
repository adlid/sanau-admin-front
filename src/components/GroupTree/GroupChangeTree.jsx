import { FC, useEffect, useState } from "react";
import { Tree } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useSnackbar } from "notistack";
import { groupItemsImages } from "../../ts/types/groupcontrol.types";
import { Input } from "@material-ui/core";

export const GroupTreeChange = (props) => {
  const { orgData, setOrgData, tabValue, searchEnabled, nodeTitle } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState([]); // final main state

  const changed = (data) => {
    return data?.map((item) => {
      if (item) {
        if (typeof data[0].icon === "string") {
          const nodeIcon = groupItemsImages.find((img) => img.name === item?.icon);

          return {
            ...item,
            icon: <nodeIcon.icon />,
            iconName: item.icon,
            titleName: item.title,
            children: item.children ? changed(item.children) : [],
          };
        } else {
          return item;
        }
      }
    });
  };

  useEffect(() => {
    orgData.length && setState(changed(orgData));
  }, [orgData]);

  const onDragEnter = (info) => {};

  const onDrop = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const isDropToMeter = info.node.unitedMeter !== null;
    const dropPos = info.node.pos.split("-");
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      if (isDropToMeter) {
        enqueueSnackbar("Нельзя переместить в счетчик!", { variant: "error" });
        return;
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };

    const data = [...state];

    let dragObj = {}; // Find dragObject
    loop(data, dragKey, (item, index, arr) => {
      arr?.splice(index, 1);
      dragObj = { ...item };
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        // item.children = item.children || [];
        item?.children?.unshift({ ...dragObj }); // where to insert
      });
    } else if (
      info.node.props.children?.length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        // item.children = item.children || [];
        item?.children?.unshift({ ...dragObj }); // where to insert
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar?.splice(i, 0, dragObj);
      } else {
        ar?.splice(i + 1, 0, dragObj);
      }
    }

    setOrgData(data);
  };

  const [searchValue, setSearchValue] = useState(nodeTitle || "");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    return parentKey;
  };

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onSearchChange = (value) => {
    const dataList = [];
    const generateList = (data) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const { key, title } = node;
        dataList.push({ key: key, title: title });
        if (node.children) {
          generateList(node.children);
        }
      }
    };
    generateList(state);

    const expandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, state);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    console.log("expandedKeys", expandedKeys);
    setExpandedKeys(expandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  useEffect(() => {
    onSearchChange(nodeTitle);
  }, [state]);

  const sloop = (data) =>
    data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue?.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { ...item, title, children: sloop(item.children) };
      }

      return {
        ...item,
        title: title,
      };
    });

  return (
    <div style={{ fontSize: "14px", width: "100%" }}>
      {searchEnabled && (
        <>
          <Input
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ width: "100%" }}
            placeholder={"Поиск"}
            className="search-input"
            value={searchValue}
          />
          <div className="mb12px"></div>
        </>
      )}

      {state.length !== 0 ? (
        <Tree
          showIcon
          switcherIcon={<DownOutlined />}
          className="draggable-tree"
          draggable
          blockNode
          onDragEnter={onDragEnter}
          onDrop={onDrop}
          treeData={sloop(state)}
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
        />
      ) : (
        <p style={{ textAlign: "center" }}>Нет данных</p>
      )}
    </div>
  );
};
