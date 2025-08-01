import React from "react";
import { Clock } from "lucide-react";

// Types pour la gestion des créneaux
export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export interface DaySchedule {
  date: string;
  slots: TimeSlot[];
}

// Configuration des horaires
export const SCHEDULE_CONFIG = {
  weekdays: {
    start: "17:30",
    end: "20:00",
    minDuration: 120, // 2h en minutes
  },
  saturday: {
    start: "07:30",
    end: "19:00",
    minDuration: 120, // 2h en minutes
  },
  sunday: {
    start: null,
    end: null,
    minDuration: 120,
  },
};

interface TimeSlotSelectorProps {
  date: string;
  serviceDuration: number;
  selectedSlot: string;
  onSlotSelect: (slot: TimeSlot) => void;
  className?: string;
}

// Fonction pour générer les créneaux disponibles pour une date donnée
export function generateTimeSlots(date: string, serviceDuration: number): TimeSlot[] {
  const dayOfWeek = new Date(date).getDay();
  const slots: TimeSlot[] = [];

  // Pas de créneaux le dimanche
  if (dayOfWeek === 0) return slots;

  let config;
  if (dayOfWeek === 6) {
    // Samedi
    config = SCHEDULE_CONFIG.saturday;
  } else {
    // Lundi à vendredi
    config = SCHEDULE_CONFIG.weekdays;
  }

  if (!config.start || !config.end) return slots;

  const startTime = new Date(`2000-01-01T${config.start}`);
  const endTime = new Date(`2000-01-01T${config.end}`);
  const slotDuration = 30; // Créneaux de 30 minutes

  let currentTime = new Date(startTime);
  
  while (currentTime < endTime) {
    const slotStart = new Date(currentTime);
    const slotEnd = new Date(currentTime.getTime() + serviceDuration * 60000);
    
    // Vérifier que le créneau complet rentre dans les horaires
    if (slotEnd <= endTime) {
      slots.push({
        start: slotStart.toTimeString().slice(0, 5),
        end: slotEnd.toTimeString().slice(0, 5),
        available: true,
      });
    }
    
    // Passer au créneau suivant
    currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
  }

  return slots;
}

// Fonction pour formater la durée en heures et minutes
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h${mins.toString().padStart(2, '0')}`;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  date,
  serviceDuration,
  selectedSlot,
  onSlotSelect,
  className = "",
}) => {
  const availableSlots = generateTimeSlots(date, serviceDuration);

  if (availableSlots.length === 0) {
    return (
      <div className={`${className}`}>
        <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Créneaux disponibles pour {formatDuration(serviceDuration)}
        </label>
        <p className="text-gray-500 text-sm">
          Aucun créneau disponible pour cette durée ({formatDuration(serviceDuration)}) sur cette date.
        </p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-semibold mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Créneaux disponibles pour {formatDuration(serviceDuration)}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {availableSlots.map((slot, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSlotSelect(slot)}
            className={`p-3 rounded-lg border text-sm font-medium transition ${
              selectedSlot === `${slot.start}-${slot.end}`
                ? "bg-[#0049ac] text-white border-[#0049ac]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#0049ac] hover:bg-blue-50"
            }`}
          >
            <div className="font-semibold">{slot.start}</div>
            <div className="text-xs opacity-75">{slot.end}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSelector; 