import React, {FC} from 'react';
import {buttonsIcons} from "../../../../../../../utils/icons/ButtonsIcons";

type PropsType = {
    imgSrc:string,
    title: string
};
export const IndicationMetersButton: FC<PropsType> = ({imgSrc, title}) => {
    const [hovered, setHovered] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);
    return (
        <div className="indication-meters-btn" onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setIsActive(!isActive)}
             style={{background: isActive?"#EBEDEF": "white"}}
        >
            <div className="d-flex justify-content-start flex-row">
                <div className="indication-meters-btn__img"
                     style={{
                         background: hovered || isActive ?
                             `url(${buttonsIcons[imgSrc + "Active"]})` :
                             `url(${buttonsIcons[imgSrc]})`
                     }}
                     />
                <span className="indication-meters-btn__title">{title}</span>
            </div>
        </div>
    )
}