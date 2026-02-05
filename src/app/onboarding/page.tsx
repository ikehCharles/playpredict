'use client';

import { OnboardingFlow } from '@main';
import { AntTheme as ThemeConfigProvider } from "@hooks";

/**
 * Onboarding page
 * Shows the complete onboarding flow for new users
 * 
 * Navigate to: /onboarding
 */
export default function OnboardingPage() {
  return (<ThemeConfigProvider>
    <div className="h-screen bg-secondary">
    <OnboardingFlow />;
    </div>
  </ThemeConfigProvider>)
}
