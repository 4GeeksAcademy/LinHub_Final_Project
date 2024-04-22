import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const steps = {
    'Question': 'this is the question',
    'options': {
        'option1': { 'word': 'this is the option 1' },
        'option2': { 'word': 'this is the option 2' },
        'option3': { 'word': 'this is the option 3' },
        'option4': { 'word': 'this is the option 4' }
    }
};


export function Exercise() {
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
        <div className="flex justify-center my-3">
            <div className="w-50">
                <Stepper className='flex justify-between' activeStep={activeStep}>
                    <div></div>
                    <MobileStepper
                        className="w-100"
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
                        <Typography className='flex justify-center' sx={{ mt: 2, mb: 1 }}><strong>{steps['question']}</strong></Typography>
                        <div className="flex flex-wrap justify-center flex-column">
                            <div className="flex justify-around mt-4 flex-wrap">
                                {Object.keys(steps.options).map((label, index) => (
                                    <Button
                                        key={index}
                                        className='my-2'
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