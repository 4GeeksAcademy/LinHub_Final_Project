import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const steps = ['dog', 'cat', 'house', 'car', 'pencil', 'flower'];

export function Exercise() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [answerIsCorrect, setAnswerIsCorrect] = React.useState(null);
  const [correctAnswers, setCorrectAnswers] = React.useState(0);
  const theme = useTheme();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    if (answerIsCorrect === steps[activeStep]) {
      setCorrectAnswers(correctAnswers + 1);
      console.log(answerIsCorrect);
      console.log(steps[activeStep]);
    }
    setSelectedOption(null);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
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
            className="w-full"
            variant="progress"
            steps={6}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: '100%', flexGrow: 2 }} // Modified width to be 100%
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === 6}>
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
          />
          {steps.map((label, index) => {
            const stepProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label}>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
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
            <Typography className='flex justify-center' sx={{ mt: 2, mb: 1 }}><strong>Select the: {steps[activeStep]}</strong></Typography>
            <div className="flex flex-wrap justify-center flex-column">
              <div className="flex justify-center mt-4">
                <Button
                  className='mx-2'
                  variant={selectedOption === 1 ? 'contained' : 'outlined'}
                  onClick={() => { handleOptionSelect(1); setAnswerIsCorrect(steps[0]); }}
                >
                  <img style={{ width: '150px', height: '150px' }} src="https://cdn.pixabay.com/photo/2024/04/11/12/31/cat-8689791_640.png" alt="cat" />
                </Button>
                <Button
                  className='mx-2'
                  variant={selectedOption === 2 ? 'contained' : 'outlined'}
                  onClick={() => { handleOptionSelect(2); setAnswerIsCorrect(steps[1]); }}
                >
                  <img style={{ width: '150px', height: '150px' }} src="https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_640.jpg" alt="dog" />
                </Button>
                <Button
                  className='mx-2'
                  variant={selectedOption === 3 ? 'contained' : 'outlined'}
                  onClick={() => { handleOptionSelect(3); setAnswerIsCorrect(steps[2]); }}
                >
                  <img style={{ width: '150px', height: '150px' }} src="https://cdn.pixabay.com/photo/2014/03/25/16/57/house-297700_640.png" alt="house" />
                </Button>
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  className='mx-2'
                  variant={selectedOption === 4 ? 'contained' : 'outlined'}
                  onClick={() => { handleOptionSelect(4); setAnswerIsCorrect(steps[3]); }}
                >
                  <img style={{ width: '150px', height: '150px' }} src="https://cdn.pixabay.com/photo/2019/03/19/09/04/car-4065110_640.png" alt="car" />
                </Button>
                <Button
                  className='mx-2'
                  variant={selectedOption === 5 ? 'contained' : 'outlined'}
                  onClick={() => { handleOptionSelect(5); setAnswerIsCorrect(steps[4]) }}
                >
                  <img style={{ width: '150px', height: '150px' }} src="https://cdn.pixabay.com/photo/2012/04/18/14/50/pencil-37254_640.png" alt="pencil" />
                </Button>
                <Button
                  className='mx-2'
                  variant={selectedOption === 6 ? 'contained' : 'outlined'}
                  onClick={() => { handleOptionSelect(6); setAnswerIsCorrect(steps[5]) }}
                >
                  <img style={{ width: '150px', height: '150px' }} src="https://cdn.pixabay.com/photo/2024/03/24/15/04/flower-8653284_640.png" alt="flower" />
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div >
  );
}