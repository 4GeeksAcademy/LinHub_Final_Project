import * as React from 'react';
import { useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext";

import LoggedNavbar from '../../component/usercourse_components/LoggedNav'
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


export function Exercise() {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [steps, setSteps] = React.useState([]);
    const [response, setResponse] = React.useState("");
    const [linResponse, setlinResponse] = React.useState("");
    const [ShowLin, setShowLin] = React.useState(false);
    const theme = useTheme();
    const { id } = useParams();

    React.useEffect(() => {
        if (store.userToken) {

            const currentLesson = async () => {
                try {
                    const res = await fetch(process.env.BACKEND_URL + `/api/lesson_questions/${id}`)
                    const data = await res.json();
                    if (!res.ok) throw new Error("Invalid credentials");
                    setSteps(data)
                } catch (error) {
                    console.error("Error logging in:", error);
                    return false;
                }
            }
            currentLesson()
            actions.currentUser(store.userToken.token)
        }
        else {
            navigate('/')
        }
    }, [])

    const handleNext = async () => {
        try {
            const res = await fetch(process.env.BACKEND_URL + `/api/correct_option/${selectedOption}`, {
                method: "GET",

                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Authorization": 'Bearer ' + store.userToken.token
                }
            });
            const data = await res.json();
            if (res.ok) {
                setCorrectAnswers(correctAnswers + 1);
                setlinResponse("correct, keep going!");
            } else {
                setlinResponse("incorrect, practice more!");
            }
            console.log(data.msg);
        } catch (error) {
            console.error("Error checking option:", error);
        }
        setTimeout(() => {
            setShowLin(false);
        }, 1600);
        setShowLin(true);
        setSelectedOption(null);
        setResponse("");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCorrectAnswers(0);
        setlinResponse("you can do it!");
    };


    const handleOptionSelect = (option) => {
        setSelectedOption(option.id);
        setResponse(option.option);
    };

    return (
        <>
            <LoggedNavbar
                userImage={store.userToken.identity.image}
                username={store.userToken.identity.first_name + ' ' + store.userToken.identity.last_name}
                language={store.userToken.identity.language == 1 ? "English" : "Español"}
            />
            <div className='w-100' style={{ minHeight: "88vh" }}>
                <div className='exercise-lin'>
                    <svg className='body' width="402" height="350" viewBox="0 0 268 233" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(60deg)' }}>
                        <path id="wing" d="M259.17 61.6942C258.446 86.2292 209.058 103.408 184.455 108.931L176.201 69.729C175.513 66.4621 247.26 40.0931 247.26 40.0931C251.76 38.1596 259.893 37.1592 259.17 61.6942Z" fill="#B02DDE" stroke="#B02DDE" />
                        <path id="wing" d="M3.31868 88.4504C8.13784 112.59 59.8098 122.558 85.0435 124.525L86.6413 84.6198C86.7745 81.2943 11.473 65.4177 11.473 65.4177C6.70254 64.1457 -1.50047 64.3109 3.31868 88.4504Z" fill="#B02DDE" stroke="#B02DDE" />
                        <path d="M80.0927 144.647C85.2284 197.734 101.774 201.218 141.524 201.218C184.887 197.89 204.477 187.751 199.342 134.664C194.206 81.5769 188.501 1.55539 127.069 4.88375C69.3518 8.0109 74.9569 91.5597 80.0927 144.647Z" fill="#B02DDE" />
                        <path d="M127.27 149.24C118.813 150.633 114.207 142.109 114.207 142.109L136.292 137.991C136.292 137.991 135.865 147.825 127.27 149.24Z" fill="#C34FEC" />
                        <path d="M155.776 142.585C147.319 143.977 142.713 135.454 142.713 135.454L164.798 131.336C164.798 131.336 164.371 141.17 155.776 142.585Z" fill="#C34FEC" />
                        <path d="M148.549 162.551C140.092 163.943 135.486 155.42 135.486 155.42L157.571 151.302C157.571 151.302 157.144 161.136 148.549 162.551Z" fill="#C34FEC" />
                        <path d="M159.592 21.5215C150.595 21.5216 140.254 28.1765 130.683 28.1768C121.112 28.1772 120.417 25.6432 101.774 25.7482C83.1315 25.8532 89.6235 80.6442 112.615 81.4202C119.975 81.6687 126.927 67.0022 134.297 66.8757C141.598 66.7504 148.699 77.3929 155.978 76.8601C178.943 75.1792 172.978 21.5215 159.592 21.5215Z" fill="#D9D9D9" />
                        <path d="M136.768 59.6306C137.76 69.8836 141.267 70.5311 149.707 70.4685C158.92 69.757 163.098 67.7663 162.107 57.5133C161.115 47.2602 160.052 31.8019 147.002 32.542C134.741 33.2373 135.776 49.3775 136.768 59.6306Z" fill="white" />
                        <path d="M102.728 62.5559C103.72 72.809 107.227 73.4564 115.667 73.3938C124.88 72.6824 129.059 70.6917 128.067 60.4386C127.075 50.1856 126.012 34.7273 112.962 35.4673C100.702 36.1626 101.737 52.3029 102.728 62.5559Z" fill="white" />
                        <path d="M117.321 79.3333C117.282 78.7824 117.697 78.3056 118.248 78.2683L148.19 76.2428C148.741 76.2055 149.22 76.6219 149.259 77.1728L150.741 98.0683C150.974 101.359 148.495 104.207 145.204 104.43L125.185 105.784C121.894 106.007 119.036 103.52 118.803 100.229L117.321 79.3333Z" fill="#F49000" />
                        <path d="M120.127 81.1623C120.088 80.6114 120.503 80.1346 121.054 80.0973L145.669 78.4322C146.22 78.3949 146.698 78.8113 146.737 79.3622L147.934 96.2394C148.168 99.5302 145.689 102.378 142.397 102.601L127.707 103.595C124.415 103.818 121.558 101.33 121.324 98.0394L120.127 81.1623Z" fill="#B16900" />
                        <path d="M122.5 101.03C119 95.5295 120.839 87.0086 120.839 87.0086C134.922 90.7475 135.714 95.4895 140.5 102.5C140.5 102.5 137.533 103.353 134 103.366C126.5 103.395 124.399 104.013 122.5 101.03Z" fill="#FFB8D1" stroke="#FFB8D1" strokeWidth="0.2" />
                        <path d="M133.205 66.3529C119.725 67.8146 116.928 81.7389 116.928 81.7389L152.365 78.6042C152.365 78.6042 146.905 64.8674 133.205 66.3529Z" fill="#FFC200" />
                        <path d="M131.795 67.8029C128.01 68.3673 127.157 71.7693 127.157 71.7693L137.104 70.4565C137.104 70.4565 135.642 67.2294 131.795 67.8029Z" fill="#FFD292" />
                        <path d="M144.765 60.6283C145.223 65.7712 147.675 65.6494 151.625 65.3138C155.575 64.9781 158.384 64.6029 157.926 59.4599C157.467 54.317 156.287 46.1524 149.965 46.6896C143.644 47.2268 144.307 55.4854 144.765 60.6283Z" fill="black" />
                        <path d="M111.265 62.9651C111.723 68.1081 114.175 67.9863 118.125 67.6506C122.075 67.315 124.884 66.9397 124.426 61.7967C123.967 56.6538 122.787 48.4892 116.465 49.0264C110.144 49.5636 110.807 57.8222 111.265 62.9651Z" fill="black" />
                        <path className='pata' d="M214.936 196.14C211.421 192.075 205.276 191.629 201.211 195.144L192.44 202.729C188.375 206.244 187.93 212.388 191.445 216.453V216.453C194.96 220.518 201.104 220.964 205.169 217.449L213.94 209.864C218.005 206.349 218.451 200.205 214.936 196.14V196.14Z" fill="#F49000" />
                        <path className='pata' d="M79.2651 208.746C81.6207 203.916 87.4458 201.91 92.2759 204.265L102.698 209.348C107.528 211.703 109.534 217.529 107.178 222.359V222.359C104.823 227.189 98.9977 229.195 94.1676 226.839L83.7456 221.756C78.9155 219.401 76.9096 213.576 79.2651 208.746V208.746Z" fill="#F49000" />
                    </svg>
                    {ShowLin &&
                        <div className='w-60 flex text-white'>
                            <div><h3 className='bg-indigo-500 p-2 rounded-t-full rounded-r-full'>{linResponse}</h3></div>
                        </div>
                    }
                </div>
                <div className="flex justify-around items-center my-3" style={{ minHeight: "80vh" }} >
                    <div className="exercise-smartphone">
                        <div className='screen'>
                            <div className='camera-side'></div>
                            <Stepper className='' activeStep={activeStep}>
                                <MobileStepper
                                    className="progress"
                                    style={{ flexGrow: '2' }}
                                    color='purple'
                                    variant="progress"
                                    steps={Object.keys(steps).length}
                                    position="static"
                                    activeStep={activeStep}
                                    sx={{ maxWidth: '100%', flexGrow: 1 }}
                                    nextButton={
                                        <Button className="" size="small" onClick={handleNext} disabled={activeStep === Object.keys(steps).length}>
                                            Send
                                            <KeyboardArrowRight />
                                        </Button>
                                    }
                                />
                            </Stepper>
                            {activeStep === Object.keys(steps).length ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
                                        Correct answers: {correctAnswers}
                                    </Typography>
                                    <div className="flex flex-col justify-start items-center pt-2">
                                        {/* <div className="flex-1"></div> */}
                                        <Button onClick={handleReset}>Reset</Button>
                                        <Link to="/usercourse">
                                            <Button>Back to courses</Button>
                                        </Link>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <div className='flex justify-start' sx={{ mt: 2, mb: 1 }}><h3 className='bg-indigo-500 m-2 p-2 rounded-t-full rounded-r-full text-white'>{steps[activeStep]['question']}</h3></div>
                                    <div className='flex justify-end' sx={{ mt: 2, mb: 1 }}><h3 className='bg-indigo-500 m-2 p-2 rounded-t-full rounded-l-full text-white'>{response}</h3></div>
                                    <div className="flex flex-wrap justify-center flex-column">
                                        <div className="flex justify-center flex-col mt-4 flex-wrap">
                                            {steps[activeStep]['options'].map(option => (
                                                <Button
                                                    className='my-2 rounded-full'
                                                    key={option.id}
                                                    variant={selectedOption === option.id ? "contained" : "outlined"}
                                                    color="primary"
                                                    onClick={() => handleOptionSelect(option)}
                                                    style={{ borderColor: 'white' }}
                                                >
                                                    {option.option.substring(0, 4) === "http" ? <img src={option.option} alt="option" style={{ width: '100px' }} /> : option.option}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}