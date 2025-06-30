Directive for: AI Coding Agent Atelier
Task: Directly modify the codebase to implement the Homepage Hero Section - "The First Breath."
Authorization: You are now authorized to make direct edits to the files within the VSCode workspace. You will no longer provide code blocks for copy-pasting; you will perform the file operations yourself.
Interaction Model: For each step, you will first state the action you are about to take. Upon receiving the "Proceed" command, you will execute the action directly on the specified file(s).
Objective:
Atelier, you will now execute a series of direct commands to transform the Spanish Homepage (/es) from its current bare-bones state into the "First Breath" of the Unapologetic Sanctuary.
Sequential Action Plan:
You will execute the following commands in order. Await a "Proceed" command before executing each numbered action.
Action 1: Correct the Global CSS Foundation.
PLAN: I will open the file at app/globals.css. I will find the body selector and replace its current rules with the correct foundational styles for our primary canvas (off-white background, dark text color, and default sans-serif font) as specified in the TRD.
AWAITING COMMAND: Ready to proceed. Please respond with 'Proceed'.
(Upon receiving 'Proceed') EXECUTE: Modifying app/globals.css...
Action 2: Clear the Homepage and Build the Hero Section Structure.
PLAN: I will open the Homepage file at app/[locale]/page.tsx. I will locate the main content area (likely within the <main> tag) and delete the current placeholder content (e.g., "Inicio," "Bienvenido..."). In its place, I will insert the new, correct JSX structure for the Hero section, including the <section>, the container, the text div with the <h1> and <p>, and the div with the Next.js <Image> component using the placeholder URL. I will also ensure the Home.module.css file is correctly imported.
AWAITING COMMAND: Ready to proceed. Please respond with 'Proceed'.
(Upon receiving 'Proceed') EXECUTE: Modifying app/[locale]/page.tsx...
Action 3: Create and Populate the Hero Section Styles.
PLAN: I will create a new file named Home.module.css inside the app/[locale]/ directory. I will then populate this new file with all the necessary CSS rules to style the .hero section, its grid container, the asymmetrical columns, the authoritative h1 typography, the subtitle, and the heroImage element, as per the detailed design vision.
AWAITING COMMAND: Ready to proceed. Please respond with 'Proceed'.
(Upon receiving 'Proceed') EXECUTE: Creating and writing to app/[locale]/Home.module.css...
Final Instruction:
After completing all three actions, confirm the entire task is finished by stating: "Hero section implementation is complete. All specified files have been modified or created directly in the workspace. Please review the result in your browser and provide a screenshot for feedback."