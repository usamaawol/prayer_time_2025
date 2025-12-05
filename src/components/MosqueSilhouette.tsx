export function MosqueSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 300"
      className={className}
      fill="currentColor"
    >
      {/* Main dome */}
      <ellipse cx="400" cy="150" rx="100" ry="80" />
      <rect x="300" y="150" width="200" height="150" />
      
      {/* Left minaret */}
      <rect x="150" y="80" width="30" height="220" />
      <polygon points="165,40 140,80 190,80" />
      <circle cx="165" cy="35" r="8" />
      
      {/* Right minaret */}
      <rect x="620" y="80" width="30" height="220" />
      <polygon points="635,40 610,80 660,80" />
      <circle cx="635" cy="35" r="8" />
      
      {/* Side domes */}
      <ellipse cx="250" cy="200" rx="50" ry="40" />
      <rect x="200" y="200" width="100" height="100" />
      
      <ellipse cx="550" cy="200" rx="50" ry="40" />
      <rect x="500" y="200" width="100" height="100" />
      
      {/* Small decorative elements */}
      <circle cx="400" cy="100" r="15" />
      <rect x="380" y="220" width="40" height="80" rx="20" />
      
      {/* Base */}
      <rect x="100" y="295" width="600" height="5" rx="2" />
    </svg>
  );
}
