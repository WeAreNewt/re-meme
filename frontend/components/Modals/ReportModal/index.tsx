
import axios from 'axios';
import { useState } from 'react';

const now = new Date().getTime();

type ReportModalProps = {
    show: boolean;
    setShow: (show: boolean) => void
    memeid: string
}

export const ReportModal = ({ show, setShow, memeid } : ReportModalProps) => {

    const [reported, setReported] = useState(false);
    const [option, setOption] = useState<string>();
    const [info, setInfo] = useState<string>();

    const handleCancel = () => {
        setReported(false)
        setShow(false)
    }

    const onReport = () => {
        setReported(true)
        
        axios.post('/api/blacklist', {
            postId: memeid,
            option: option,
            info: info
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return (
        <div onMouseDown={() => setShow(false)} className={`${show ? "block" : "hidden"} fixed h-screen w-screen z-20 flex items-center justify-center create-btn-gradient-transparent px-4 lg:px-0 top-0 left-0`}>
            <div onMouseDown={(e) => e.stopPropagation()} className="main-container items-start w-full lg:w-[600px]">
                <h3 className="text-subtitle-2 mb-[20px]">REPORT MEME</h3> 
                <h5 className="text-body-2-medium mb-[16px]">Why are you reporting this meme?</h5>
                <select
                    className="border-2 border-black border-solid rounded-xl w-full p-2 mb-[16px] h-[48px]"
                    onChange={(e) => setOption(e.target.value)}
                >
                    <option defaultValue="select an option">Select an option</option>
                    <option value="It's spam">It&apos;s spam</option>
                    <option value="Nudity of sexual activity">Nudity of sexual activity</option>
                    <option value="Hate speech or symbols">Hate speech or symbols</option>
                    <option value="False information">False information</option>
                    <option value="Bully or harassment">Bully or harassment</option>
                    <option value="Scam or fraud">Scam or fraud</option>
                    <option value="Violence or dangerous organizations">Violence or dangerous organizations</option>
                    <option value="Intellectual property violation">Intellectual property violation</option>
                    <option value="Sale of illegal or regulated goods">Sale of illegal or regulated goods</option>
                    <option value="Suicide or self harm">Suicide or self harm</option>
                    <option value="Something else">Something else</option>
                </select>
                <h6 className="text-description-regular bg-orange-200 rounded-[8px] px-[16px] py-[8px] text-orange-800 mb-[24px]">
                    Your report is anonymous, except if you&apos;re reporting on intellectual property infringement. Please be sure to include all information required by the DMCA in your takedown request and send to IP@aave.com. See Terms of Service for additional details.
                </h6>
                <label className="text-body-2-medium mb-[8px]">Please, provide more information</label>
                <textarea
                    onChange={(e) => setInfo(e.target.value)}
                    placeholder="Type here"
                    id="large-input"
                    className="h-[100px] px-[16px] py-[10px] w-full rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                { reported && <label className="text-body-2-medium">Content has been reported. Thank you.</label>}
                <div className="flex w-full justify-end mt-[36px] gap-[16px]">
                    { 
                        !reported  &&  (
                            <button
                                onClick={handleCancel}
                                className={"btn-small-secondary"}
                            >
                                Cancel
                            </button>
                        )
                    }
                    <button 
                        disabled={!option}
                        onClick={reported ? handleCancel : onReport}
                        className={"btn-small"}
                    >
                        {reported ? 'Close' : 'Report'}
                    </button>
                </div>
            </div>
        </div>
    )
}