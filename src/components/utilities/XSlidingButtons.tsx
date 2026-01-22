import { IdNameIconType } from "@models"
import Button from "./Button"



interface XSlidingButtonsProps {
    buttonList: IdNameIconType[],
    selectedButton: IdNameIconType,
    setSelectedButton: (val: IdNameIconType) => void
}

const XSlidingButtons: React.FC<XSlidingButtonsProps> = (props) => {

    const { buttonList, selectedButton, setSelectedButton } = props

    return (
        <div style={{scrollbarWidth: 'none'}} className="flex item-center px-2 gap-3 pb-3 pt-1 overflow-x-auto">
            {buttonList.map((btn) => (
                <Button onClick={() => setSelectedButton(btn)} type={btn.id === selectedButton.id ? 'primary' : 'default'} key={btn.id} >
                    <span>{btn.icon}</span>
                    <span>{btn.name}</span>
                </Button>
            ))}
        </div>
    )
}

export default XSlidingButtons;