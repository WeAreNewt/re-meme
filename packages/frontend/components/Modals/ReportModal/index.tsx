
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
    const [alert, setAlert] = useState<boolean>(false);

    const handleCancel = () => {
        setReported(false)
        setShow(false)
    }

    const onReport = (memeid) => {
        setReported(true)
        setAlert(false)
        axios.post('/api/blacklist', {
            postId: parseInt(memeid)
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
            <div onMouseDown={(e) => e.stopPropagation()} className="comic-border rounded-4xl bg-white n:p-4 lg:p-10">
                <h3 className="mb-6">REPORT MEME</h3> 
                
                <h5>Why are you reporting this meme?</h5>
                <select
                className="border-2 border-black border-solid rounded-xl w-full p-2 mb-2 mt-3 h-12"
                //onChange={}
                onChange={(e) => setOption(e.target.value)}
                >
                <option selected>Select an option</option>
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
            <div className="mt-3">
                <h6 className="whitespace-normal bg-[#FFE3B0] rounded-lg p-3">Your report is anonymous, except if you&apos;re reporting on intellectual property infringement.</h6>
            </div>
            <div className="mb-6 mt-4">
                <label className="mb-2 text-xl">Please, provide more information</label>
                <input onChange={(e) => setInfo(e.target.value)} type="text" placeholder="Type here" id="large-input" className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
            </div>

            <div className="mb-6 mt-4">
                { alert ? <label className="mb-2 text-sm">Please provide more information before submitting</label> : ''}
            </div>

            <div className="mb-6 mt-4">
                { reported ? <label className="mb-2 text-xl">Content has been reported. Thank you.</label> : ''}
            </div>

                <div className="flex justify-end  mt-10">
                    {reported ? '' : <button onClick={handleCancel} className={"flex items-center bg-white rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 comic-border-mini mr-4"}>Cancel</button>}
                    <button disabled={!option} onClick={!info ? (e) => setAlert(true) : reported ? handleCancel : onReport} className={"flex items-center bg-purple rounded-full p-3 border-black border-2 border-solid min-w-fit max-h-6 comic-border-mini"}>{reported ? 'Close' : 'Report'}</button>
                </div>
            </div>
        </div>
    )
}