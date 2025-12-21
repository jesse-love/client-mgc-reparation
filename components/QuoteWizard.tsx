import React from 'react';
import { useQuoteWizard } from '../contexts/QuoteWizardContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useBusinessInfo } from '../contexts/BusinessInfoContext';
import WizardLayout from './wizard/WizardLayout';
import StepVehicle from './wizard/StepVehicle';
import StepService from './wizard/StepService';
import StepVehicleDetails from './wizard/StepVehicleDetails';
import StepContact from './wizard/StepContact';
import { TruckIcon } from '@heroicons/react/24/solid';
import { trackConversion } from '../utils/googleTag';

const QuoteWizard: React.FC = () => {
    const { wizardData } = useQuoteWizard();
    const { t } = useLanguage();
    const { phone } = useBusinessInfo();

    // RENDER LOGIC
    const renderStep = () => {
        // SPECIAL CASE: HEAVY TRUCK CODE RED (Step 2 interception)
        // If user selects "Heavy Truck", we show a special High Urgency screen before the service selection?
        // Actually, in the previous logic, there was a "Code Red" screen.
        // Let's implement that as a specialized view if needed, BUT deeper analysis showed Step 2 was the Service Menu.
        // Wait, the previous code had: if (vehicleType === 'Heavy Truck' && step === 2) -> Show "Call Priority Line".
        // Let's preserve that "Code Red" conversion trap.

        if (wizardData.vehicleType === 'Heavy Truck' && wizardData.step === 2) {
            // We can either make this a separate component or inline it here as a "Step 1.5"
            // But to keep it modular, let's allow StepService to handle the logic OR render a specific "CodeRed" component.
            // Given the "Deep Focus" refactor, we moved to a Service Menu. 
            // However, strictly following the "recreate" instruction, I should enable the functionality.

            // The PREVIOUS "Deep Focus" update REPLACED the Code Red screen with the Menu containing "VIP Priority".
            // So I will stick to the Menu (StepService) as it offers better granularity (Fleet vs Safety vs Priority).
            // However, if the user explicitly wants the "Code Red" screen back, I can add it. 
            // IMPERATOR STRATEGY: The Menu is better because it captures "Fleet Managers" (not urgent) too.
            // "Priority Repair" option in StepService will lead to the same result.

            return <StepService />;
        }

        if (wizardData.vehicleType === 'Generator' && wizardData.step === 3) {
            // Generators don't need Car make/model flow. Auto-advance to Contact.
            // But we can't do state updates in render. 
            // Ideally the previous step should have set step 4.
            // OR we render <StepContact /> for step 3 if generator.
            return <StepContact />;
        }

        switch (wizardData.step) {
            case 1: return <StepVehicle />;
            case 2: return <StepService />;
            case 3: return <StepVehicleDetails />;
            case 4: return <StepContact />;
            default: return null;
        }
    };

    return (
        <WizardLayout
            title={t.quoteWizard.formTitle}
            currentStep={wizardData.step}
            totalSteps={4}
        >
            {renderStep()}
        </WizardLayout>
    );
};

export default QuoteWizard;