import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export function Exercise(steps) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [answerIsCorrect, setAnswerIsCorrect] = React.useState(null);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const theme = useTheme();

    const handleNext = () => {
        if (answerIsCorrect === Object.keys(steps)[activeStep]) {
            setCorrectAnswers(correctAnswers + 1);
        }
        console.log('answerIsCorrect', answerIsCorrect);
        console.log(Object.keys(steps)[activeStep]);

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
        <div className="flex justify-center">
            <div className="w-100">
                <Stepper activeStep={activeStep}>
                    <MobileStepper
                        className=""
                        variant="progress"
                        steps={6}
                        position="static"
                        activeStep={activeStep}
                        sx={{ maxWidth: '100%', flexGrow: 1 }}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === Object.keys(steps).length}>
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                    />
                    {Object.keys(steps).map((label, index) => {
                        return (
                            <Step key={label}>
                            </Step>
                        );
                    })}
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
                        </div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography className='flex justify-center' sx={{ mt: 2, mb: 1 }}><strong>Select the: {Object.keys(steps)[activeStep]}</strong></Typography>
                        <div className="flex flex-wrap justify-center flex-column">
                            <div className="flex justify-center mt-4">
                                {Object.keys(steps).map((label, index) => (
                                    <Button
                                        key={index}
                                        className='mx-2'
                                        variant={selectedOption === index + 1 ? 'contained' : 'outlined'}
                                        onClick={() => { handleOptionSelect(index + 1); setAnswerIsCorrect(label); }}
                                    >
                                        <img style={{ width: '150px', height: '150px' }} src={steps[label]} alt={label} />
                                    </Button>

                                ))}
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div >
    );
}