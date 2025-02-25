export const medicalCases = [
  {
    id: '1',
    title: 'The Mysterious Belly Pain',
    description: "Private Thompson stumbles into the MASH unit holding his abdomen.\n\n'Doc, I was just enjoying my powdered eggs when this pain hit me like a jeep!' he groans.\n\nVital Signs:\n- Temperature: 101.2°F\n- Pulse: 102/min\n- BP: 130/85\n\nExamination:\n- Abdomen is rigid with rebound tenderness in the right lower quadrant\n- Patient reports pain started around umbilicus and migrated to RLQ\n- Positive McBurney's point tenderness\n- Rovsing's sign positive",
    diagnosis: 'Acute Appendicitis',
    options: [
      {
        id: 'a',
        text: 'Give morphine for pain and observe',
        isCorrect: false,
        feedback: "Hawkeye would say: 'Sure, and while we're at it, why don't we just invite the appendix to poker night? That's a hot appendix ready to blow!'"
      },
      {
        id: 'b',
        text: 'Immediate appendectomy',
        isCorrect: true,
        feedback: "Hawkeye: 'Time to remove the troublemaker - and I don't mean Klinger! Quick thinking, doctor. That appendix was about to make like a grenade.'"
      },
      {
        id: 'c',
        text: 'Prescribe antibiotics only',
        isCorrect: false,
        feedback: "BJ: 'That's like bringing a water gun to a forest fire! This soldier needs steel, not pills.'"
      }
    ],
    tip: "Classic appendicitis presents with periumbilical pain migrating to RLQ, fever, and rebound tenderness. When you see this triad with a positive McBurney's point, don't wait - operate!"
  },
  {
    id: '2',
    title: 'The Dancing Lieutenant',
    description: "Lieutenant Roberts arrives doing an unusual dance.\n\n'I can't stop moving my legs!' he exclaims.\n\nVital Signs:\n- Temperature: 103.1°F\n- Pulse: 125/min\n- BP: 165/95\n\nExamination:\n- Severe muscle rigidity ('lead-pipe')\n- Excessive sweating\n- Altered mental status\n- Tremors\n\nMedical History:\n- Recently started on haloperidol for acute psychosis\n- No other significant medical history",
    diagnosis: 'Neuroleptic Malignant Syndrome',
    options: [
      {
        id: 'a',
        text: 'Continue current medications',
        isCorrect: false,
        feedback: "Hawkeye: 'That's like adding gasoline to a flambé! Those antipsychotics are the problem, not the solution.'"
      },
      {
        id: 'b',
        text: 'Immediate discontinuation of antipsychotics and supportive care',
        isCorrect: true,
        feedback: "Colonel Potter: 'Good call! Sometimes the best medicine is to stop the medicine. Get this man cooled down and supported - stat!'"
      },
      {
        id: 'c',
        text: 'Prescribe more antipsychotics',
        isCorrect: false,
        feedback: "Radar: 'Sir, I may just be a corporal, but even I know that's not right! His temperature is higher than a helicopter in a MASH unit!'"
      }
    ],
    tip: "High fever, muscle rigidity, and recent antipsychotic use are the key signs. This is a medical emergency - stopping the triggering medication is crucial for survival."
  },
  {
    id: '3',
    title: 'The Breathless Sergeant',
    description: "Sergeant Miller is rushed in by his unit.\n\n'He collapsed during patrol, sir! One minute he was fine, the next...'\n\nVital Signs:\n- Temperature: 98.6°F\n- Pulse: 135/min\n- BP: 85/60\n- Respiratory Rate: 32/min\n\nExamination:\n- Acute respiratory distress\n- Right leg swollen and tender\n- Pleuritic chest pain\n- Oxygen saturation 88%\n\nMedical History:\n- Recent leg injury from jeep accident (2 weeks ago)\n- Otherwise healthy",
    diagnosis: 'Pulmonary Embolism',
    options: [
      {
        id: 'a',
        text: 'Start antibiotics for pneumonia',
        isCorrect: false,
        feedback: "BJ: 'Wrong enemy, doctor! This isn't an infection we're fighting - it's a clot playing hide and seek in his lungs!'"
      },
      {
        id: 'b',
        text: 'Give fluids and observe',
        isCorrect: false,
        feedback: "Hawkeye: 'While we're at it, why don't we just serve him a martini? This man needs anticoagulation, not hydration!'"
      },
      {
        id: 'c',
        text: 'Immediate heparin and supportive care',
        isCorrect: true,
        feedback: "Colonel Potter: 'Now that's using your noggin! Quick action with anticoagulation - that's what separates the living from the dead in PE cases.'"
      }
    ],
    tip: "Recent trauma, leg swelling, and sudden shortness of breath? Think PE! The combination of Wells criteria and these symptoms makes pulmonary embolism highly likely."
  }
];