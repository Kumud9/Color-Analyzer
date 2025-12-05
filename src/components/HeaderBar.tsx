const HeaderBar = () => {
  return (
    <header 
      className="py-3 px-4"
      style={{
        background: 'linear-gradient(90deg, #b98b13, #e8ca68, #b98b13)',
        borderBottom: '2px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      <p 
        className="text-center font-bold tracking-[0.3em] text-sm md:text-base"
        style={{ 
          color: '#1a1a2e',
          textShadow: '1px 1px 4px rgba(255, 255, 255, 0.4)'
        }}
      >
        ※ COLOR ANALYZER ※
      </p>
    </header>
  );
};

export default HeaderBar;
