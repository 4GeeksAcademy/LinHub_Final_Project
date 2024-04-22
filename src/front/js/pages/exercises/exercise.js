import * as React from 'react';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [steps, setSteps] = React.useState([]);
    const theme = useTheme();
    const { id } = useParams();
    React.useEffect(() => {
        if (store.userToken) {
            const currentLesson = async () => {
                try {
                    const res = await fetch(process.env.BACKEND_URL + `/api/lesson_questions/${id}`)
                    const data = await res.json();
                    if (!res.ok) throw new Error("Invalid credentials");
                    console.log(data)
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
            const res = await fetch(process.env.BACKEND_URL + `/api/correct_option/${selectedOption}`);
            const data = await res.json();
            if (res.ok) {
                setCorrectAnswers(correctAnswers + 1);
            }
            console.log(data.msg);
        } catch (error) {
            console.error("Error checking option:", error);
        }

        setSelectedOption(null);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCorrectAnswers(0);
    };


    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <div className='w-100'>
            <div className="flex justify-center my-3" >
                <div className="w-4/12 outlined border-3" style={{ borderColor: 'purple' }}>
                    <Stepper className='flex justify-between' activeStep={activeStep}>
                        <div></div>
                        <MobileStepper
                            className="w-100"
                            variant="progress"
                            steps={Object.keys(steps).length}
                            position="static"
                            activeStep={activeStep}
                            sx={{ maxWidth: '100%', flexGrow: 1 }}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === Object.keys(steps).length}>
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
                            <Typography className='flex justify-center' sx={{ mt: 2, mb: 1, color: 'purple' }}><strong>{steps[activeStep]['question']}</strong></Typography>
                            <div className="flex flex-wrap justify-center flex-column">
                                <div className="flex justify-around mt-4 flex-wrap">
                                    {steps[activeStep]['options'].map(option => (
                                        <Button
                                            className='my-2'
                                            key={option.id}
                                            variant={selectedOption === option.id ? "contained" : "outlined"}
                                            color="primary"
                                            onClick={() => handleOptionSelect(option.id)}
                                            style={{ borderColor: 'purple', color: 'purple' }}
                                        >
                                            {option.option}
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