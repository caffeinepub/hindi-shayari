export function Background() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #05060A 0%, #080B16 40%, #0D0A1E 70%, #05060A 100%)",
        }}
      />

      {/* Stars */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 0%, transparent 100%), radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 85% 35%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 20% 85%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(1px 1px at 45% 45%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 65% 25%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(1px 1px at 90% 70%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 5% 50%, rgba(255,255,255,0.5) 0%, transparent 100%)",
        }}
      />

      {/* Purple orb – top left */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full animate-float"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.30) 0%, rgba(109, 40, 217, 0.15) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Pink orb – bottom right */}
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full animate-float2"
        style={{
          background:
            "radial-gradient(circle, rgba(192, 38, 211, 0.25) 0%, rgba(236, 72, 153, 0.12) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Cyan orb – top right */}
      <div
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full animate-float3"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(77, 163, 255, 0.08) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Mid purple blob */}
      <div
        className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full animate-float2"
        style={{
          background:
            "radial-gradient(circle, rgba(109, 40, 217, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "3s",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
