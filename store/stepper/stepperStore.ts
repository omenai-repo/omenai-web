import { create } from "zustand";

type StepperStoreTypes = {
    cardInput: CardInputTypes,
    setCardInput: (label: string, value: string) => void;
    index: number,
    updateIndex: () => void,
    storeCardInputResponse: any,
    setStoreCardInputResponse: (e: any) => void,
    pinInput: string,
    setPinInput: (e: string) => void,
    storePinInputResponse: any,
    setStorePinInputResponse: (e: any) => void,
    otpInput: string,
    setOtpInput: (e: string) => void,
    storeOtpInputResponse: any,
    setStoreOtpInputResponse: (e: void) => any
};

export const useStepperStore = create<StepperStoreTypes>((set, get) => ({
    cardInput: {
        card: "",
        cvv: "",
        month: "",
        year: ""
    },
    setCardInput: (label: string, value: string) => {
        const data: Record<string, any> = get().cardInput

        if (label in data) {
            const updatedData = { ...data, [label]: value };
      
            set({
              cardInput: updatedData as CardInputTypes,
            });
          }
    },
    index: 0,
    updateIndex: () => {
        const data = get().index

        set({
            index: data + 1
        })
    },
    storeCardInputResponse: {},
    setStoreCardInputResponse(e) {
        set({
            storeCardInputResponse: e
        })
    },
    pinInput: "",
    setPinInput: (e: string) => {
        set({
            pinInput: e
        })
    },
    storePinInputResponse: {},
    setStorePinInputResponse: (e: any) => {
        set({
            storePinInputResponse: e
        })
    },
    otpInput: "",
    setOtpInput: (e: string) => {
        set({
            otpInput: e
        })
    },
    storeOtpInputResponse: {},
    setStoreOtpInputResponse: (e: any) => {
        set({
            storeOtpInputResponse: e
        })
    }
}))