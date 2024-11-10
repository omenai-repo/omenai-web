type displayStepperIndexTypes = {
    index: number, 
    stepperComponentIndex: number
}

export const displayStepperComponent = (index: number, stepperComponentIndex: number) => {

    if(index === stepperComponentIndex){
        return true
    }

    return false
}