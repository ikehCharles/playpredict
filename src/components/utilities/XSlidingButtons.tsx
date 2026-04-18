import { cssRgbVar, ThemeColorName, toColor } from "@/src/constants"
import { IdNameIconType } from "@models"
import { Button, Icon } from "@utilities"



interface XSlidingButtonsProps {
    buttonList: IdNameIconType[],
    selectedButton: IdNameIconType,
    setSelectedButton: (val: IdNameIconType) => void
}

const XSlidingButtons: React.FC<XSlidingButtonsProps> = (props) => {

    const { buttonList, selectedButton, setSelectedButton } = props

 
    return (

        <div style={{ scrollbarWidth: 'none' }} className="flex item-center px-1 gap-3 pb-3 pt-1 overflow-x-auto">
            {buttonList.map((btn) => (
                <Button
                    bgColor={btn.id === selectedButton.id ? 'primary' : 'secondary'}
                    textColor={btn.id === selectedButton.id ? 'secondary' : 'tertiary'}
                    borderColor={btn.id === selectedButton.id ? 'primary' : 'secondary'}
                    size="large"
                    onClick={() => setSelectedButton(btn)}
                    type={btn.id === selectedButton.id ? 'primary' : 'default'}
                    key={btn.id}
                    defaultShadow={`0 1px 4px ${toColor("tertiary", 0.1)}`}
                >
                    {btn.icon && <Icon className={btn.icon} />}
                    <span>{btn.name}</span>
                </Button>
            ))}
        </div>
    )
}

export default XSlidingButtons;