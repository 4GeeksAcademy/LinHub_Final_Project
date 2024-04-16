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

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export function Exercise() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [answerIsCorrect, setAnswerIsCorrect] = React.useState(false);
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

    if (answerIsCorrect === true) {

    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
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
            sx={{ maxWidth: '100%', flexGrow: 1 }} // Modified width to be 100%
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <div className="flex flex-row pt-2">
              <div className="flex-1"></div>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>step:{activeStep + 1}</Typography>
            <div className="flex flex-wrap justify-center">
              <img src="https://via.placeholder.com/150" alt="dog" className="m-2" />
              <img src="https://via.placeholder.com/150" alt="dog" className="m-2" />
              <img src="https://via.placeholder.com/150" alt="dog" className="m-2" />
              <img src="https://via.placeholder.com/150" alt="dog" className="m-2" />
            </div>
            <div className="flex justify-center mt-4">
              <Button
                variant={selectedOption === 1 ? 'contained' : 'outlined'}
                onClick={() => { handleOptionSelect(1); setAnswerIsCorrect(true); }}
              >
                Option 1
              </Button>
              <Button
                variant={selectedOption === 2 ? 'contained' : 'outlined'}
                onClick={() => { handleOptionSelect(2); setAnswerIsCorrect(false); }}
              >
                Option 2
              </Button>
              <Button
                variant={selectedOption === 3 ? 'contained' : 'outlined'}
                onClick={() => { handleOptionSelect(3); setAnswerIsCorrect(false); }}
              >
                Option 3
              </Button>
              <Button
                variant={selectedOption === 4 ? 'contained' : 'outlined'}
                onClick={() => { handleOptionSelect(4); setAnswerIsCorrect(false); }}
              >
                Option 4
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div >
  );
}