import { useTeams } from "~/context/team-context";

interface TeamBadgeProps {
  badgeFile?: string;
  teamName: string;
  className?: string;
}

export default function TeamBadge({ teamName, className = "w-6 h-6" }: TeamBadgeProps) {
  const teamMap = useTeams();
  const badgeFile = teamMap[teamName];

  // If no filename exists in the sheet data, instantly use the fallback layout
  if (!badgeFile) {
    return <FallbackBadge teamName={teamName} className={className} />;
  }

  const baseFolder = import.meta.env.BASE_URL || "/";
  const cleanBase = baseFolder.endsWith("/") ? baseFolder : `${baseFolder}/`;
  const badgeSrc = `${cleanBase}team-badges/${badgeFile}`;

  return (
    <img
      // Vite and React Router serve everything in the public/ folder from the root "/"
      src={badgeSrc}
      alt={`${teamName} badge`}
      className={`${className} object-contain select-none`}
      draggable={false}
      onError={(e) => {
        // If the file fails to load (404), switch to the fallback component gracefully
        e.currentTarget.style.display = 'none';
        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
        if (fallback) fallback.style.display = 'flex';
      }}
    />
  );
}

function FallbackBadge({ teamName, className }: { teamName: string; className: string }) {
  const firstLetter = teamName ? teamName.charAt(0).toUpperCase() : "?";
  return (
    <div className={`${className} bg-slate-200 text-slate-600 rounded-full flex items-center justify-center font-black text-[10px] select-none`}>
      {firstLetter}
    </div>
  );
}