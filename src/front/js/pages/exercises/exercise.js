import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import { createClient } from 'pexels';

// const client = createClient('pdSaE5ImyRjq1WWMe7Hk8gIxELfoMiosLjjIPaJh8QgHHlBJCHyG2OfT');

const steps = {
    "dog": "https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_640.jpg",
    "cat": "https://cdn.pixabay.com/photo/2014/11/30/14/11/kitty-551554_640.jpg",
    "elephant": "https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_640.jpg",
    "horse": "https://cdn.pixabay.com/photo/2017/02/01/12/14/animal-2030012_640.png",
    "cow": "https://cdn.pixabay.com/photo/2012/04/12/21/26/cow-30710_640.png",
    "sheep": "https://cdn.pixabay.com/photo/2016/05/12/23/03/lamb-1388937_1280.png"
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
                        <Typography className='flex justify-center' sx={{ mt: 2, mb: 1 }}><strong>Select the: {Object.keys(steps)[activeStep]}</strong></Typography>
                        <div className="flex flex-wrap justify-center flex-column">
                            <div className="flex justify-around mt-4 flex-wrap">
                                {Object.keys(steps).map((label, index) => (
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