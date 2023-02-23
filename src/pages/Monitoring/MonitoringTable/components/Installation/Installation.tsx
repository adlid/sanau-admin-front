import { FC, useState } from "react"


export const Installation: FC = () => {
    const [isPopoverOpen, togglePopoverOpen] = useState(false)

    return <div
        onMouseEnter={
            () => togglePopoverOpen(true)
        }
        onMouseLeave={
            () => togglePopoverOpen(false)
        }

        className="installation-box d-flex justify-content-center align-items-center">
        <span>
        </span>
        {isPopoverOpen && <div className="installation-box__popover d-flex justify-content-center align-items-center">
            <div className="installation-box__box">
            </div>
            <span>
                Нет данных
            </span>
        </div>}
    </div>
}