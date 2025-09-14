export default function TacticalSection() {
  const domains = [
    {
      name: "MARITIME",
      position: { top: "339px", left: "789px" },
      size: { width: "145px", height: "42px" },
      icon: (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" className="text-scout-green">
          <path d="M0.870422 3.95165L3.95842 0.790039H8.20717L0.870422 8.25884V3.95165Z" fill="currentColor"/>
          <path d="M9.70337 0.790039H5.98405V2.03484H9.70337V0.790039Z" fill="currentColor"/>
          <path d="M2.10976 9.65921V5.9248H0.869982V9.65921H2.10976Z" fill="currentColor"/>
          <path d="M24.116 21.0654L21.0281 24.13H16.7793L24.116 16.8236V21.0654Z" fill="currentColor"/>
          <path d="M15.2826 24.13H19.0019V22.8852H15.2826V24.13Z" fill="currentColor"/>
          <path d="M22.8763 15.2608V18.9952H24.116V15.2608H22.8763Z" fill="currentColor"/>
          <path d="M24.116 3.95165L21.0005 0.790039H16.7793L24.116 8.25884V3.95165Z" fill="currentColor"/>
          <path d="M15.2826 0.790039H19.0019V2.03484H15.2826V0.790039Z" fill="currentColor"/>
          <path d="M22.8763 9.65921L22.8763 5.9248L24.116 5.9248L24.116 9.65921L22.8763 9.65921Z" fill="currentColor"/>
          <path d="M0.870438 20.9684L3.95844 24.1301H8.20719L0.870438 16.6613L0.870438 20.9684Z" fill="currentColor"/>
          <path d="M9.70337 24.13L5.98405 24.13L5.98405 22.8852L9.70337 22.8852L9.70337 24.13Z" fill="currentColor"/>
          <path d="M2.10976 15.2608L2.10976 18.9952L0.869982 18.9952L0.869982 15.2608L2.10976 15.2608Z" fill="currentColor"/>
          <path d="M11.8286 8.25879C11.8286 8.25879 12.2032 8.25877 12.4932 8.25882C12.7831 8.25886 13.1575 8.25879 13.1575 8.25879C13.9133 10.5218 15.1119 12.612 16.6773 14.4015L16.0144 15.572C13.6903 15.1001 11.2958 15.1001 8.9717 15.572L8.30882 14.4015C9.87426 12.612 11.0728 10.5218 11.8286 8.25879Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "GROUND",
      position: { top: "527px", left: "732px" },
      size: { width: "94px", height: "32px" },
      icon: (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" className="text-scout-green">
          <path d="M0.940376 2.71697L3.24248 0.359985H6.40993L0.940376 5.92799V2.71697Z" fill="currentColor"/>
          <path d="M7.52526 0.359985H4.7525V1.28799H7.52526V0.359985Z" fill="currentColor"/>
          <path d="M1.86421 6.97199V4.18799H0.939959V6.97199H1.86421Z" fill="currentColor"/>
          <path d="M18.2699 15.4752L15.9678 17.7599H12.8004L18.2699 12.313V15.4752Z" fill="currentColor"/>
          <path d="M11.6846 17.76H14.4573V16.832H11.6846V17.76Z" fill="currentColor"/>
          <path d="M17.3457 11.148V13.932H18.2699V11.148H17.3457Z" fill="currentColor"/>
          <path d="M18.2699 2.71697L15.9473 0.359985H12.8004L18.2699 5.92799V2.71697Z" fill="currentColor"/>
          <path d="M11.6846 0.359985H14.4574V1.28799H11.6846V0.359985Z" fill="currentColor"/>
          <path d="M17.3457 6.97199L17.3457 4.18799L18.2699 4.18799L18.2699 6.97199L17.3457 6.97199Z" fill="currentColor"/>
          <path d="M0.940293 15.403L3.2424 17.76H6.40985L0.940292 12.192L0.940293 15.403Z" fill="currentColor"/>
          <path d="M7.52526 17.76L4.7525 17.76L4.7525 16.832L7.52526 16.832L7.52526 17.76Z" fill="currentColor"/>
          <path d="M1.8642 11.148L1.8642 13.932L0.939951 13.932L0.939951 11.148L1.8642 11.148Z" fill="currentColor"/>
          <path d="M9.10966 5.92798C9.10966 5.92798 9.38886 5.92797 9.60508 5.928C9.82124 5.92803 10.1003 5.92798 10.1003 5.92798C10.6638 7.61502 11.5573 9.1733 12.7243 10.5073L12.2302 11.38C10.4975 11.0282 8.71243 11.0282 6.9798 11.38L6.48563 10.5073C7.65266 9.1733 8.5462 7.61502 9.10966 5.92798Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "DRONE",
      position: { top: "438px", left: "443px" },
      size: { width: "101px", height: "37px" },
      icon: (
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" className="text-scout-green">
          <path d="M0.880386 3.39995L3.53707 0.679932H7.19238L0.880386 7.10553V3.39995Z" fill="currentColor"/>
          <path d="M8.47955 0.679932H5.27972V1.75087H8.47955V0.679932Z" fill="currentColor"/>
          <path d="M1.94656 8.31033V5.09753H0.879954V8.31033H1.94656Z" fill="currentColor"/>
          <path d="M20.8791 18.1233L18.2225 20.7599H14.5672L20.8791 14.474V18.1233Z" fill="currentColor"/>
          <path d="M13.2795 20.7599H16.4793V19.689H13.2795V20.7599Z" fill="currentColor"/>
          <path d="M19.8125 13.1295V16.3423H20.8791V13.1295H19.8125Z" fill="currentColor"/>
          <path d="M20.8791 3.39995L18.1988 0.679932H14.5672L20.8791 7.10553V3.39995Z" fill="currentColor"/>
          <path d="M13.2795 0.679932H16.4793V1.75087H13.2795V0.679932Z" fill="currentColor"/>
          <path d="M19.8125 8.31033L19.8125 5.09753L20.8791 5.09753L20.8791 8.31033L19.8125 8.31033Z" fill="currentColor"/>
          <path d="M0.880341 18.0399L3.53703 20.76H7.19233L0.880341 14.3344L0.880341 18.0399Z" fill="currentColor"/>
          <path d="M8.47955 20.7599L5.27972 20.7599L5.27972 19.689L8.47955 19.689L8.47955 20.7599Z" fill="currentColor"/>
          <path d="M1.94656 13.1295L1.94656 16.3423L0.879954 16.3423L0.879954 13.1295L1.94656 13.1295Z" fill="currentColor"/>
          <path d="M10.308 7.10547C10.308 7.10547 10.6302 7.10545 10.8797 7.10549C11.1292 7.10553 11.4512 7.10547 11.4512 7.10547C12.1014 9.05236 13.1326 10.8506 14.4794 12.3902L13.9091 13.3972C11.9096 12.9912 9.84957 12.9912 7.85008 13.3972L7.27979 12.3902C8.62657 10.8506 9.65773 9.05236 10.308 7.10547Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "AIRCRAFT",
      position: { top: "419px", left: "1017px" },
      size: { width: "113px", height: "33px" },
      icon: (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" className="text-scout-green">
          <path d="M0.230377 3.22672L2.63965 0.76001H5.95455L0.230377 6.58721V3.22672Z" fill="currentColor"/>
          <path d="M7.1218 0.76001H4.21997V1.73121H7.1218V0.76001Z" fill="currentColor"/>
          <path d="M1.19724 7.67984V4.76624H0.229956V7.67984H1.19724Z" fill="currentColor"/>
          <path d="M18.3666 16.579L15.9574 18.9701H12.6425L18.3666 13.2695V16.579Z" fill="currentColor"/>
          <path d="M11.4747 18.97H14.3766V17.9988H11.4747V18.97Z" fill="currentColor"/>
          <path d="M17.3994 12.0503V14.9639H18.3666V12.0503H17.3994Z" fill="currentColor"/>
          <path d="M18.3666 3.22672L15.9359 0.76001H12.6425L18.3666 6.58721V3.22672Z" fill="currentColor"/>
          <path d="M11.4748 0.76001H14.3766V1.73121H11.4748V0.76001Z" fill="currentColor"/>
          <path d="M17.3994 7.67984L17.3994 4.76624L18.3666 4.76624L18.3666 7.67984L17.3994 7.67984Z" fill="currentColor"/>
          <path d="M0.230316 16.5033L2.63959 18.97H5.95449L0.230316 13.1428L0.230316 16.5033Z" fill="currentColor"/>
          <path d="M7.1218 18.97L4.21997 18.97L4.21997 17.9988L7.1218 17.9988L7.1218 18.97Z" fill="currentColor"/>
          <path d="M1.19723 12.0501L1.19724 14.9637L0.229956 14.9637L0.229956 12.0501L1.19723 12.0501Z" fill="currentColor"/>
          <path d="M8.77997 6.58716C8.77997 6.58716 9.07217 6.58715 9.29845 6.58718C9.52467 6.58721 9.81673 6.58716 9.81673 6.58716C10.4064 8.35274 11.3416 9.98356 12.5629 11.3797L12.0457 12.293C10.2324 11.9248 8.36425 11.9248 6.55096 12.293L6.03378 11.3797C7.25514 9.98356 8.19028 8.35274 8.77997 6.58716Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "SPACE",
      position: { top: "243px", left: "666px" },
      size: { width: "77px", height: "28px" },
      icon: (
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" className="text-scout-green">
          <path d="M0.390388 2.78479L2.42656 0.700073H5.22812L0.390388 5.62487V2.78479Z" fill="currentColor"/>
          <path d="M6.21456 0.700073H3.7621V1.52087H6.21456V0.700073Z" fill="currentColor"/>
          <path d="M1.20746 6.54834V4.08594H0.389973V6.54834H1.20746Z" fill="currentColor"/>
          <path d="M15.718 14.0693L13.6819 16.0901H10.8803L15.718 11.2723V14.0693Z" fill="currentColor"/>
          <path d="M9.8934 16.0901H12.3458V15.2693H9.8934V16.0901Z" fill="currentColor"/>
          <path d="M14.9005 10.2418V12.7042H15.718V10.2418H14.9005Z" fill="currentColor"/>
          <path d="M15.718 2.78479L13.6637 0.700073H10.8803L15.718 5.62487V2.78479Z" fill="currentColor"/>
          <path d="M9.89342 0.700073H12.3459V1.52087H9.89342V0.700073Z" fill="currentColor"/>
          <path d="M14.9005 6.54834L14.9005 4.08594L15.718 4.08594L15.718 6.54834L14.9005 6.54834Z" fill="currentColor"/>
          <path d="M0.390274 14.0054L2.42645 16.0901H5.228L0.390274 11.1653L0.390274 14.0054Z" fill="currentColor"/>
          <path d="M6.21456 16.0901L3.7621 16.0901L3.7621 15.2693L6.21456 15.2693L6.21456 16.0901Z" fill="currentColor"/>
          <path d="M1.20745 10.2418L1.20745 12.7042L0.389969 12.7042L0.389968 10.2418L1.20745 10.2418Z" fill="currentColor"/>
          <path d="M7.61593 5.62488C7.61593 5.62488 7.86288 5.62487 8.05412 5.6249C8.24531 5.62492 8.49214 5.62488 8.49214 5.62488C8.99051 7.11704 9.78082 8.49531 10.813 9.67525L10.376 10.4471C8.84348 10.1359 7.26459 10.1359 5.73211 10.4471L5.29502 9.67525C6.32724 8.49531 7.11756 7.11704 7.61593 5.62488Z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full min-h-[900px] bg-scout-dark overflow-x-hidden">
      {/* Main tactical image */}
      <div className="absolute inset-0">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/290ac69a87c1ae0db082db2e38f80e4d0c45ca7a?width=2880" 
          alt="Tactical operations visualization" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Domain badges positioned absolutely over the image */}
      {domains.map((domain, index) => (
        <div
          key={index}
          className="absolute flex items-center gap-3 px-4 py-3 rounded-lg border border-scout-border bg-scout-card-bg/80 backdrop-blur-md shadow-lg"
          style={{
            top: domain.position.top,
            left: domain.position.left,
            width: domain.size.width,
            height: domain.size.height,
          }}
        >
          <div className="flex-shrink-0">
            {domain.icon}
          </div>
          <span className="text-caption text-scout-text-secondary">
            {domain.name}
          </span>
        </div>
      ))}

      {/* Content section */}
      <div className="absolute bottom-0 left-0 right-0 bg-scout-dark border-t border-scout-border">
        <div className="container mx-auto py-20">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left content */}
            <div>
              <h3 className="text-caption text-scout-text-secondary mb-8">
                Multi-Domain Embodied AI
              </h3>
              <h2 className="text-heading-2 md:text-heading-1 text-scout-text-primary font-normal">
                Onboard foundation<br />
                model turning defense<br />
                robots into autonomous<br />
                agents
              </h2>
            </div>

            {/* Right content */}
            <div className="lg:mt-20">
              <p className="text-body-large text-scout-text-muted">
                Collaborative autonomy: robot to<br />
                robot coordination via natural<br />
                language protocol
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
