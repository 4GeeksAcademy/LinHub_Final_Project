import * as React from 'react';
import { useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext";

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
            }
            console.log(data.msg);
        } catch (error) {
            console.error("Error checking option:", error);
        }
        setSelectedOption(null);
        setResponse("");
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCorrectAnswers(0);
    };


    const handleOptionSelect = (option) => {
        setSelectedOption(option.id);
        setResponse(option.option);
    };

    return (
        <div className='w-100'>
            <div className="flex justify-center my-3" >
                <div id='colorChange' className="w-1/2 h-auto outlined border-2 p-3 rounded-3xl" style={{ borderColor: 'purple' }}>
                    <Stepper className='flex justify-between' activeStep={activeStep}>
                        <MobileStepper
                            className="w-100"
                            color='purple'
                            variant="progress"
                            steps={Object.keys(steps).length}
                            position="static"
                            activeStep={activeStep}
                            sx={{ maxWidth: '100%', flexGrow: 1 }}
                            nextButton={
                                <Button style={{ color: 'purple' }} size="small" onClick={handleNext} disabled={activeStep === Object.keys(steps).length}>
                                    Next
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft style={{ color: 'purple' }} />
                                    ) : (
                                        <KeyboardArrowRight style={{ color: 'purple' }} />
                                    )}
                                </Button>
                            }
                        />
                    </Stepper>
                    <hr style={{ color: 'purple' }} />
                    {activeStep === Object.keys(steps).length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                Correct answers: {correctAnswers}
                            </Typography>
                            <div className="flex flex-row pt-2">
                                <div className="flex-1"></div>
                                <Button onClick={handleReset}>Reset</Button>
                                <Link to="/usercourse">
                                    <Button>Back to courses</Button>
                                </Link>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Typography className='flex justify-start' sx={{ mt: 2, mb: 1, color: 'white' }}><h3 className='bg-indigo-500 m-2 p-2 rounded-t-full rounded-r-full'>{steps[activeStep]['question']}</h3></Typography>
                            <Typography className='flex justify-end' sx={{ mt: 2, mb: 1, color: 'white' }}><h3 className='bg-indigo-500 m-2 p-2 rounded-t-full rounded-l-full'>{response}</h3></Typography>
                            <hr style={{ color: 'purple' }} />
                            <div className="flex flex-wrap justify-center flex-column">
                                <div className="flex justify-around flex-col mt-4 flex-wrap">
                                    {steps[activeStep]['options'].map(option => (
                                        <Button
                                            className='my-2 rounded-full'
                                            key={option.id}
                                            variant={selectedOption === option.id ? "contained" : "outlined"}
                                            color="primary"
                                            onClick={() => handleOptionSelect(option)}
                                            style={{ borderColor: 'purple', color: 'purple' }}
                                        >
                                            {option.option.substring(0, 4) === "http" ? <img src={option.option} alt="option" style={{ width: '100px' }} /> : option.option}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div >
        </div>
    );
}