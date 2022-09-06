import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { ChangeEventHandler, useEffect, useState } from "react";
import useLensModuleEnabledCurrencies from "../../../hooks/useLensModuleEnabledCurrencies";
import { Currency } from "../../../models/Module/module.mode";

export interface FormData {
    amount: BigNumber,
    currency: string,
    recipient: string,
    referralFee: number,
    followerOnly: boolean
}

type UpdateCollectSettingsProps = {
    show: boolean;
    setShow: (show: boolean) => void
    initialValues: FormData,
    onSubmit: (formData: FormData) => void
}

export const UpdateCollectSettingsModal = ({ show, setShow, initialValues, onSubmit }: UpdateCollectSettingsProps) => {

    const [ amount, setAmount ] = useState<string>('0')
    const [ recipient, setRecipient ] = useState<string>('')
    const [ referralFee, setReferralFee ]= useState<number>(0)
    const [ currency, setCurrency ] = useState<Currency>()
    const [ followerOnly, setFollowerOnly ] = useState<boolean>(false)
    const { currencies } = useLensModuleEnabledCurrencies()

    const setCollectAmount: ChangeEventHandler<HTMLInputElement> = (e) => {
        if(/^[0-9]*(?:\.[0-9]*)?$/.test(e.target.value) ) {
            setAmount(e.target.value)
        }
    }

    const setFeeRecipient : ChangeEventHandler<HTMLInputElement> = (e) => {
        // if(/^0x[a-fA-F0-9]{40}$/.test(e.target.value)) setRecipient(e.target.value)
        setRecipient(e.target.value)
    }

    const setSelectedCurrency = (selectedCurrency: Currency) => {
        setCurrency(selectedCurrency)
    }

    const setReferralInputFee : ChangeEventHandler<HTMLInputElement> = (e) => {
        setReferralFee(e.target.valueAsNumber)
    } 

    useEffect(() => {
        if(currencies.length) {
            const moduleCurrency = currencies.find(currency => currency.address === initialValues.currency)
            setRecipient(initialValues.recipient)
            setFollowerOnly(initialValues.followerOnly)
            setCurrency(moduleCurrency)
            setAmount(formatUnits(initialValues.amount, moduleCurrency?.decimals))
            setReferralFee(initialValues.referralFee)
        }
    }, [currencies, initialValues])

    const handleSubmit = () => {
        if(currencies && currency) {
            onSubmit({
                amount: parseUnits(amount, currency?.decimals),
                currency: currency.address,
                recipient,
                referralFee,
                followerOnly
                
            })
        }
    }

    return (
        <div onMouseDown={() => setShow(false)} className={`${show ? "block" : "hidden"} fixed h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0 top-0 left-0`}>
            <div onMouseDown={(e) => e.stopPropagation()} className="main-container items-stretch w-full lg:w-[570px]">
                <h2 className="text-subtitle-2 mb-[10px]">Update collect settings</h2>
                <p className="text-description-regular mb-[36px]">Allow users to collect your meme for a listed amount and currency. Specify which users can collect your meme. You can update and disable/enable any parameter at anytime</p>

                <label className="mb-[8px] text-body-2-medium">Currency</label>
                <div className="flex items-start gap-[8px] mb-4">
                    {
                        currencies.map(currentCurrency => (
                            <button
                                onClick={() => setSelectedCurrency(currentCurrency)}
                                className={`btn-small-secondary ${currency === currentCurrency && 'bg-neutral-black shadow-none hover:bg-neutral-black text-neutral-white'}`}
                                key={currentCurrency.address}>{currentCurrency.symbol}
                            </button>
                        ))
                    }
                </div>

                <label className="mb-[8px] text-body-2-medium">Collect amount</label>
                <input min={0} value={amount} onInput={setCollectAmount} className="border-2 border-black border-solid rounded-xl p-2 mb-4"/>

                <label className="mb-[8px] text-body-2-medium">Fund recipient</label>
                <input value={recipient} onChange={setFeeRecipient} className="border-2 border-black border-solid rounded-xl p-2 mb-4"/>

                <label className="mb-[8px] text-body-2-medium">Secondary royalty</label>
                <input onChange={setReferralInputFee} value={referralFee} min={0} max={100} type="number" className="border-2 border-black border-solid rounded-xl p-2 mb-4"/>


                <label className="text-body-2-medium mb-[16px]">Who can collect</label>

                <div className="flex items-center gap-[10px] mb-[16px]">
                    <input onClick={() => setFollowerOnly(false)} className={"h-[20px] w-[20px] bg-black" } type="checkbox" checked={!followerOnly} />
                    <label className="text-body-2-medium">Anyone can collect</label>
                </div>
                <div className="flex items-center gap-[10px] mb-[36px]">
                    <input onClick={() => setFollowerOnly(true)} className={"h-[20px] w-[20px] accent-bg-purple"} type="checkbox" checked={followerOnly} />
                    <label className="text-body-2-medium">Only followers can collect</label>
                </div>

                <div className="flex justify-end gap-[16px]">
                    <button onClick={() => setShow(false)} className="btn-small-secondary"> Cancel</button>
                    <button onClick={handleSubmit} className="btn-small"> Save changes</button>
                </div>
            </div>
        </div>
    )
}
