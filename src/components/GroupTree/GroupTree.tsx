import React, { FC } from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { AppPopper } from "../Tooltip/AppPopper";

import { ReactComponent as Trash } from "../../assets/imgs/trash.svg";
import { ReactComponent as Pencil } from "../../assets/imgs/pencil.svg";
import { groupItemsImages, OrganizationTree } from "../../ts/types/groupcontrol.types";
import { ReactComponent as Checked } from "../../assets/imgs/checkedGreen.svg";
import { ReactComponent as NotChecked } from "../../assets/imgs/notChecked.svg";

interface IGroupTreeProps {
  orgData: any;
  onItemClick?: any;
  onItemDeleteClick?: any;
  onItemChangeClick?: any;
  onlyRead?: boolean;
}

export const GroupTree: FC<IGroupTreeProps> = (props) => {
  const { orgData, onItemClick, onItemDeleteClick, onItemChangeClick, onlyRead } = props;

  const renderTree = (nodes: OrganizationTree) => {
    const nodeIcon: any = groupItemsImages.find((img) => img.name === nodes?.icon);

    return (
      <div className="group-tree-item">
        <TreeItem
          key={nodes.key}
          nodeId={`${nodes.key}`}
          label={
            <p className="group-tree-item__title">
              {nodeIcon?.icon && <nodeIcon.icon style={{ marginRight: "13px" }} />}
              {nodes?.meterName?.length ? nodes.meterName : (nodes?.title || nodes.unitedMeter?.meter?.serial)}
            </p>
          }
        >
          {Array.isArray(nodes.children)
            ? nodes.children.map((node: any, index: number) => {
              if (node) return <div key={index}>{renderTree(node)}</div>;
            })
            : null}
        </TreeItem>
        <div className="group-tree-item__rightSide">
          {nodes?.unitedMeter === null ? (
            <p
              className="group-tree-item__rightSide_values"
              onClick={() => onItemClick && onItemClick(nodes.key)}
              style={onItemClick ? { cursor: "pointer" } : { cursor: "unset" }}
            >
              <span className="green">{nodes.activeMeters}</span> / <span className="red">{nodes.inactiveMeters}</span>
            </p>
          ) : (
            <p
              onClick={() => onItemClick && onItemClick(nodes.key)}
              style={onItemClick ? { cursor: "pointer", marginBottom: 0 } : { cursor: "unset", marginBottom: 0 }}
            >
              {nodes.unitedMeter?.active ? <Checked /> : <NotChecked />}
            </p>
          )}
          {!onlyRead && (
            <AppPopper
              content={
                <div className="grouptree_item_menu">
                  {nodes.unitedMeter === null && (
                    <div className="group-tree-item__rightSide_menu_item" onClick={() => onItemChangeClick(nodes.key)}>
                      <Pencil className="icon" /> Изменить
                    </div>
                  )}

                  <div
                    className="group-tree-item__rightSide_menu_item"
                    onClick={() => onItemDeleteClick(nodes.key, nodes.title)}
                  >
                    <Trash className="icon" /> Удалить
                  </div>
                </div>
              }
              placement="bottom-end"
            >
              <MoreHorizIcon className="group-tree-item__rightSide_menu" />
            </AppPopper>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {orgData?.length > 0 ? (
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={["root"]}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {orgData?.map((item: any, index: number) => {
            if (item !== undefined) return <div key={index}>{renderTree(item)}</div>;
          })}
        </TreeView>
      ) : (
        <div>
          <p style={{ textAlign: "center" }}>Нет данных</p>
        </div>
      )}
    </>
  );
};
