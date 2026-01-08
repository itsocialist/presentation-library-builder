import React, { useState } from 'react';

const MarketSegmentationAnalysis = () => {
  const [activePage, setActivePage] = useState('overview');
  const [activeSegment, setActiveSegment] = useState(null);
  
  const colors = {
    rockyGreen: '#10B981',
    rockyGreenDim: '#065F46',
    cyan: '#06B6D4',
    amber: '#F59E0B',
    red: '#EF4444',
    purple: '#8B5CF6',
    slate900: '#0F172A',
    slate800: '#1E293B',
    slate700: '#334155',
    slate400: '#94A3B8',
    slate200: '#E2E8F0',
    white: '#F8FAFC'
  };

  const compositionData = [
    { label: 'HPC/Research', value: 8000, percent: 29, color: colors.slate700, tier: 'Tier 2' },
    { label: 'Experimentation', value: 15000, percent: 54, color: colors.slate800, tier: 'Tier 3' },
    { label: 'AI Scaling', value: 800, percent: 2.8, color: colors.cyan, tier: 'Tier 1' },
    { label: 'AI-Native', value: 50, percent: 0.2, color: colors.rockyGreen, tier: 'Tier 1' },
    { label: 'Other', value: 4000, percent: 14, color: colors.slate900, tier: 'N/A' }
  ];

  const revenueData = [
    { segment: 'AI-Native Production', companies: 50, customers: '5-8', revenue: 0.65, color: colors.rockyGreen },
    { segment: 'AI Scaling On-Prem', companies: 400, customers: '20-30', revenue: 2.5, color: colors.cyan },
    { segment: 'HPC/Research AI', companies: 8000, customers: '10-20', revenue: 1.5, color: colors.slate700 },
    { segment: 'Cloud-Native AI', companies: 400, customers: '5-10', revenue: 0.75, color: colors.amber }
  ];

  const gapsData = [
    { gap: 'AI-Native Tech', current: 50, needed: 150, deficit: 100 },
    { gap: 'Quant Trading', current: 1, needed: 20, deficit: 19 },
    { gap: 'Telco Providers', current: 5, needed: 30, deficit: 25 },
    { gap: 'Korean Ecosystem', current: 3, needed: 10, deficit: 7 }
  ];

  const quadrantData = [
    { name: 'HPC Research', x: 15, y: 20, size: 120, companies: 8000, revenue: '1-2M', color: colors.slate700 },
    { name: 'AI Scaling', x: 50, y: 20, size: 80, companies: 400, revenue: '2-3M', color: colors.cyan },
    { name: 'Ideal Customer', x: 85, y: 20, size: 40, companies: 50, revenue: '0.5-0.8M', color: colors.rockyGreen },
    { name: 'Startups/SMB', x: 15, y: 80, size: 100, companies: 12000, revenue: 'Low', color: colors.slate800 },
    { name: 'Cloud-Native', x: 50, y: 80, size: 70, companies: 400, revenue: '0.5-1M', color: colors.amber },
    { name: 'Hyperscalers', x: 85, y: 80, size: 35, companies: 30, revenue: 'Strategic', color: colors.rockyGreenDim }
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue));

  const NavButton = ({ page, label }) => (
    <button
      onClick={() => setActivePage(page)}
      style={{
        padding: '0.75rem 1.5rem',
        background: activePage === page ? colors.rockyGreen : 'transparent',
        border: `1px solid ${activePage === page ? colors.rockyGreen : colors.slate700}`,
        color: activePage === page ? colors.slate900 : colors.slate400,
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        transition: 'all 0.3s',
        fontFamily: 'Inter, sans-serif'
      }}
      onMouseEnter={(e) => {
        if (activePage !== page) {
          e.target.style.borderColor = colors.rockyGreen;
          e.target.style.color = colors.rockyGreen;
        }
      }}
      onMouseLeave={(e) => {
        if (activePage !== page) {
          e.target.style.borderColor = colors.slate700;
          e.target.style.color = colors.slate400;
        }
      }}
    >
      {label}
    </button>
  );

  const EvidenceItem = ({ type, typeLabel, claim, sources, methodology }) => (
    <div style={{ 
      marginBottom: '2rem',
      padding: '1.5rem',
      background: 'rgba(255, 255, 255, 0.02)',
      borderLeft: `4px solid ${colors.cyan}`,
      borderRadius: '4px',
      transition: 'all 0.3s'
    }}>
      <div style={{
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        background: type === 'internal' ? 'rgba(6, 182, 212, 0.1)' :
                   type === 'market' ? 'rgba(245, 158, 11, 0.1)' :
                   type === 'customer' ? 'rgba(16, 185, 129, 0.1)' :
                   type === 'technical' ? 'rgba(139, 92, 246, 0.1)' :
                   'rgba(239, 68, 68, 0.1)',
        border: `1px solid ${type === 'internal' ? 'rgba(6, 182, 212, 0.3)' :
                type === 'market' ? 'rgba(245, 158, 11, 0.3)' :
                type === 'customer' ? colors.rockyGreenDim :
                type === 'technical' ? 'rgba(139, 92, 246, 0.3)' :
                'rgba(239, 68, 68, 0.3)'}`,
        borderRadius: '4px',
        color: type === 'internal' ? colors.cyan :
               type === 'market' ? colors.amber :
               type === 'customer' ? colors.rockyGreen :
               type === 'technical' ? colors.purple :
               colors.red,
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '0.75rem'
      }}>
        {typeLabel}
      </div>
      
      <div style={{
        color: colors.white,
        fontWeight: '600',
        fontSize: '1.05rem',
        marginBottom: '1rem',
        lineHeight: '1.4'
      }}>
        {claim}
      </div>
      
      <div style={{
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: `1px solid ${colors.slate800}`
      }}>
        {sources.map((source, i) => (
          <div key={i} style={{
            marginBottom: '0.75rem',
            paddingLeft: '1.5rem',
            position: 'relative'
          }}>
            <span style={{
              position: 'absolute',
              left: '0',
              color: colors.rockyGreen,
              fontWeight: 'bold'
            }}>→</span>
            <div style={{ color: colors.slate200, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              <span style={{
                display: 'inline-block',
                background: colors.rockyGreenDim,
                color: colors.rockyGreen,
                padding: '0.15rem 0.5rem',
                borderRadius: '3px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                fontWeight: '600',
                marginRight: '0.5rem'
              }}>[{source.num}]</span>
              {source.label}
            </div>
            <div style={{ color: colors.cyan, fontSize: '0.85rem', lineHeight: '1.5' }}>
              {source.detail}
            </div>
          </div>
        ))}
      </div>
      
      {methodology && (
        <div style={{
          background: 'rgba(6, 182, 212, 0.1)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          padding: '1.5rem',
          borderRadius: '6px',
          marginTop: '1rem'
        }}>
          <div style={{ color: colors.cyan, fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
            {methodology.title}
          </div>
          <div style={{ color: colors.slate400, fontSize: '0.9rem', lineHeight: '1.6' }}>
            {methodology.content}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ 
      background: colors.slate900, 
      minHeight: '100vh', 
      color: colors.slate400,
      fontFamily: 'Inter, -apple-system, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header & Navigation */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '200', 
            color: colors.white,
            textAlign: 'center',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}>
            RLC-AI Market Segmentation Analysis
          </h1>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1rem', 
            color: colors.slate400,
            marginBottom: '2rem'
          }}>
            28,023 Companies | $4M-$6.8M Revenue Potential | 440 Addressable Targets
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <NavButton page="overview" label="Overview" />
            <NavButton page="revenue" label="Revenue Analysis" />
            <NavButton page="quadrant" label="Market Quadrant" />
            <NavButton page="gaps" label="Critical Gaps" />
            <NavButton page="citations" label="Evidence & Citations" />
          </div>
        </div>

        {/* PAGE: Overview */}
        {activePage === 'overview' && (
          <div>
            <div style={{ 
              margin: '2rem 0', 
              padding: '2rem', 
              background: 'rgba(30, 41, 59, 0.3)',
              border: `1px solid ${colors.slate800}`,
              borderRadius: '8px'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '300', 
                color: colors.white,
                marginBottom: '2rem',
                paddingBottom: '0.5rem',
                borderBottom: `2px solid ${colors.rockyGreen}`
              }}>
                Database Composition: Only 3% in Target Segments
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <svg viewBox="0 0 300 300" style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}>
                    <circle cx="150" cy="150" r="90" fill="none" stroke={colors.slate800} strokeWidth="60" />
                    <circle cx="150" cy="150" r="90" fill="none" stroke={colors.slate700} strokeWidth="60"
                      strokeDasharray={`${compositionData[0].percent * 5.65} 565`}
                      strokeDashoffset="0"
                      transform="rotate(-90 150 150)" />
                    <circle cx="150" cy="150" r="90" fill="none" stroke={colors.slate800} strokeWidth="60"
                      strokeDasharray={`${compositionData[1].percent * 5.65} 565`}
                      strokeDashoffset={`-${compositionData[0].percent * 5.65}`}
                      transform="rotate(-90 150 150)" />
                    <circle cx="150" cy="150" r="90" fill="none" stroke={colors.cyan} strokeWidth="60"
                      strokeDasharray={`${compositionData[2].percent * 5.65} 565`}
                      strokeDashoffset={`-${(compositionData[0].percent + compositionData[1].percent) * 5.65}`}
                      transform="rotate(-90 150 150)" 
                      style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.6))' }} />
                    <circle cx="150" cy="150" r="90" fill="none" stroke={colors.rockyGreen} strokeWidth="60"
                      strokeDasharray={`${compositionData[3].percent * 5.65} 565`}
                      strokeDashoffset={`-${(compositionData[0].percent + compositionData[1].percent + compositionData[2].percent) * 5.65}`}
                      transform="rotate(-90 150 150)"
                      style={{ filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.8))' }} />
                    
                    <text x="150" y="145" textAnchor="middle" fill={colors.slate200} fontSize="24" fontWeight="300">28,023</text>
                    <text x="150" y="165" textAnchor="middle" fill={colors.slate400} fontSize="12">Total Companies</text>
                  </svg>
                </div>

                <div style={{ fontSize: '0.95rem' }}>
                  {compositionData.map((item, i) => (
                    <div key={i} style={{ 
                      marginBottom: '1.5rem',
                      padding: '1rem',
                      borderLeft: `4px solid ${item.color}`,
                      paddingLeft: '1rem',
                      background: activeSegment === i ? 'rgba(255,255,255,0.05)' : 'transparent',
                      transition: 'background 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setActiveSegment(i)}
                    onMouseLeave={() => setActiveSegment(null)}>
                      <div style={{ color: colors.white, fontWeight: '600', marginBottom: '0.25rem' }}>
                        {item.label}
                      </div>
                      <div style={{ color: colors.slate400 }}>
                        {item.value.toLocaleString()} companies ({item.percent}%)
                      </div>
                      <div style={{ 
                        color: item.tier.includes('Tier 1') ? colors.rockyGreen : colors.slate400,
                        fontSize: '0.85rem',
                        marginTop: '0.25rem',
                        fontWeight: '600'
                      }}>
                        {item.tier}
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ 
                    marginTop: '2rem', 
                    padding: '1rem', 
                    background: 'rgba(239, 68, 68, 0.1)',
                    borderLeft: `4px solid ${colors.red}`,
                    paddingLeft: '1rem',
                    borderRadius: '4px'
                  }}>
                    <div style={{ color: colors.red, fontWeight: '600', fontSize: '1.1rem' }}>
                      Critical Finding
                    </div>
                    <div style={{ color: colors.slate200, marginTop: '0.5rem', lineHeight: '1.5' }}>
                      Only <strong style={{ color: colors.white }}>850 companies (3%)</strong> fit ideal customer profile
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              {[
                { number: '29%', label: 'HPC/Research', desc: 'Strength doesn\'t align with AI production targets (3%)', color: colors.slate700 },
                { number: '10+', label: 'Toyota Entities', desc: '$1.5M-$6M potential from single ecosystem', color: colors.cyan },
                { number: '<0.2%', label: 'AI-Native Cos', desc: 'Fastest-growing segment missing - needs partnerships', color: colors.red },
                { number: '8K', label: 'HPC-to-AI Path', desc: 'Lower-friction conversion opportunity', color: colors.rockyGreen }
              ].map((finding, i) => (
                <div key={i} style={{ 
                  padding: '1.5rem',
                  background: 'rgba(30, 41, 59, 0.3)',
                  border: `1px solid ${colors.slate800}`,
                  borderLeft: `4px solid ${finding.color}`,
                  paddingLeft: '1.5rem',
                  borderRadius: '4px',
                  transition: 'background 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.3)'}>
                  <div style={{ 
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '2.5rem',
                    fontWeight: '600',
                    color: finding.color,
                    lineHeight: '1',
                    marginBottom: '0.5rem',
                    textShadow: `0 0 20px ${finding.color}40`
                  }}>
                    {finding.number}
                  </div>
                  <div style={{ color: colors.white, fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {finding.label}
                  </div>
                  <div style={{ color: colors.slate400, fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {finding.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE: Revenue Analysis */}
        {activePage === 'revenue' && (
          <div style={{ 
            margin: '2rem 0', 
            padding: '2rem', 
            background: 'rgba(30, 41, 59, 0.3)',
            border: `1px solid ${colors.slate800}`,
            borderRadius: '8px'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '300', 
              color: colors.white,
              marginBottom: '2rem',
              paddingBottom: '0.5rem',
              borderBottom: `2px solid ${colors.rockyGreen}`
            }}>
              Revenue Opportunity by Segment
            </h2>
            
            <div style={{ position: 'relative', height: '400px', marginTop: '2rem' }}>
              <svg viewBox="0 0 800 350" style={{ width: '100%', height: '100%' }}>
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <line 
                    key={i}
                    x1="100" 
                    y1={50 + i * 50} 
                    x2="750" 
                    y2={50 + i * 50} 
                    stroke={colors.slate800} 
                    strokeDasharray="2,2"
                    strokeWidth="1"
                  />
                ))}
                
                {[3, 2.5, 2, 1.5, 1, 0.5, 0].map((val, i) => (
                  <text key={i} x="85" y={50 + i * 50 + 5} textAnchor="end" fill={colors.slate400} fontSize="12">
                    ${val}M
                  </text>
                ))}
                
                {revenueData.map((item, i) => {
                  const barHeight = (item.revenue / maxRevenue) * 250;
                  const x = 120 + i * 160;
                  const y = 300 - barHeight;
                  
                  return (
                    <g key={i}>
                      <rect
                        x={x}
                        y={y}
                        width="120"
                        height={barHeight}
                        fill={item.color}
                        rx="4"
                        opacity="0.9"
                      />
                      <text 
                        x={x + 60} 
                        y={y - 10} 
                        textAnchor="middle" 
                        fill={colors.white}
                        fontSize="14"
                        fontWeight="600"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        ${item.revenue.toFixed(1)}M
                      </text>
                      <text 
                        x={x + 60} 
                        y={325} 
                        textAnchor="middle" 
                        fill={colors.slate400}
                        fontSize="11"
                      >
                        {item.segment.split(' ')[0]}
                      </text>
                      <text 
                        x={x + 60} 
                        y={340} 
                        textAnchor="middle" 
                        fill={colors.slate400}
                        fontSize="11"
                      >
                        {item.segment.split(' ').slice(1).join(' ')}
                      </text>
                    </g>
                  );
                })}
                
                <line x1="100" y1="133" x2="750" y2="133" stroke={colors.rockyGreen} strokeWidth="2" strokeDasharray="5,5" opacity="0.7" />
                <text x="740" y="128" textAnchor="end" fill={colors.rockyGreen} fontSize="12" fontWeight="600">
                  $5M Target
                </text>
              </svg>
            </div>

            <div style={{ 
              marginTop: '2rem', 
              padding: '1rem', 
              background: 'rgba(16, 185, 129, 0.1)',
              borderLeft: `4px solid ${colors.rockyGreen}`,
              paddingLeft: '1rem',
              borderRadius: '4px'
            }}>
              <div style={{ color: colors.rockyGreen, fontWeight: '600', marginBottom: '0.5rem' }}>
                Total Potential: $4.0M - $6.8M
              </div>
              <div style={{ color: colors.slate200, fontSize: '0.95rem' }}>
                Expected 40-68 customers from existing base within 18 months
              </div>
            </div>
          </div>
        )}

        {/* PAGE: Market Quadrant */}
        {activePage === 'quadrant' && (
          <div style={{ 
            margin: '2rem 0', 
            padding: '2rem', 
            background: 'rgba(30, 41, 59, 0.3)',
            border: `1px solid ${colors.slate800}`,
            borderRadius: '8px'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '300', 
              color: colors.white,
              marginBottom: '2rem',
              paddingBottom: '0.5rem',
              borderBottom: `2px solid ${colors.rockyGreen}`
            }}>
              Market Segmentation Quadrant
            </h2>
            
            <div style={{ position: 'relative', height: '500px', marginTop: '2rem' }}>
              <svg viewBox="0 0 800 450" style={{ width: '100%', height: '100%' }}>
                <line x1="100" y1="50" x2="100" y2="400" stroke={colors.slate700} strokeWidth="2" />
                <line x1="100" y1="400" x2="750" y2="400" stroke={colors.slate700} strokeWidth="2" />
                
                <line x1="100" y1="225" x2="750" y2="225" stroke={colors.slate800} strokeDasharray="4,4" strokeWidth="1" />
                <line x1="316" y1="50" x2="316" y2="400" stroke={colors.slate800} strokeDasharray="4,4" strokeWidth="1" />
                <line x1="533" y1="50" x2="533" y2="400" stroke={colors.slate800} strokeDasharray="4,4" strokeWidth="1" />
                
                <text x="425" y="435" textAnchor="middle" fill={colors.slate200} fontSize="13" fontWeight="600">
                  AI Deployment Maturity →
                </text>
                <text x="50" y="225" textAnchor="middle" fill={colors.slate200} fontSize="13" fontWeight="600" 
                  transform="rotate(-90 50 225)">
                  ← Infrastructure Model
                </text>
                
                <text x="208" y="420" textAnchor="middle" fill={colors.slate400} fontSize="12">Experimentation</text>
                <text x="424" y="420" textAnchor="middle" fill={colors.slate400} fontSize="12">Implementation</text>
                <text x="641" y="420" textAnchor="middle" fill={colors.slate400} fontSize="12">Execution</text>
                
                <text x="90" y="130" textAnchor="end" fill={colors.slate400} fontSize="12">On-Prem/Hybrid</text>
                <text x="90" y="320" textAnchor="end" fill={colors.slate400} fontSize="12">Cloud-First</text>
                
                {[
                  { x: 208, y: 90, text: 'Tier 2 (~8K)' },
                  { x: 424, y: 90, text: 'Tier 1 (~400)' },
                  { x: 641, y: 90, text: 'Tier 1 (~50)' },
                  { x: 208, y: 360, text: 'Tier 3 (~12K)' },
                  { x: 424, y: 360, text: 'Tier 2 (~400)' },
                  { x: 641, y: 360, text: 'Tier 1 (~30)' }
                ].map((label, i) => (
                  <text key={i} x={label.x} y={label.y} textAnchor="middle" 
                    fill={colors.slate700} fontSize="10" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                    {label.text}
                  </text>
                ))}
                
                {quadrantData.map((bubble, i) => {
                  const cx = 100 + (bubble.x / 100) * 650;
                  const cy = 50 + (bubble.y / 100) * 350;
                  
                  return (
                    <g key={i}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={bubble.size / 2}
                        fill={bubble.color}
                        opacity="0.7"
                        stroke={bubble.color}
                        strokeWidth="2"
                      />
                      <text 
                        x={cx} 
                        y={cy + 4} 
                        textAnchor="middle" 
                        fill={colors.white}
                        fontSize="11"
                        fontWeight="600"
                        pointerEvents="none"
                      >
                        {bubble.companies >= 100 ? bubble.companies.toLocaleString() : ''}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            <div style={{ 
              marginTop: '2rem', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem',
              fontSize: '0.85rem'
            }}>
              {quadrantData.map((bubble, i) => (
                <div key={i} style={{ 
                  padding: '0.75rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderLeft: `3px solid ${bubble.color}`,
                  paddingLeft: '0.75rem'
                }}>
                  <div style={{ color: colors.white, fontWeight: '600', fontSize: '0.9rem' }}>
                    {bubble.name}
                  </div>
                  <div style={{ color: colors.slate400, marginTop: '0.25rem' }}>
                    {bubble.companies.toLocaleString()} cos • {bubble.revenue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGE: Critical Gaps */}
        {activePage === 'gaps' && (
          <div style={{ 
            margin: '2rem 0', 
            padding: '2rem', 
            background: 'rgba(30, 41, 59, 0.3)',
            border: `1px solid ${colors.slate800}`,
            borderRadius: '8px'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '300', 
              color: colors.white,
              marginBottom: '2rem',
              paddingBottom: '0.5rem',
              borderBottom: `2px solid ${colors.rockyGreen}`
            }}>
              Critical Market Gaps: Pipeline Development Needs
            </h2>
            
            <div style={{ marginTop: '2rem' }}>
              {gapsData.map((gap, i) => {
                const currentPercent = (gap.current / gap.needed) * 100;
                const deficitPercent = (gap.deficit / gap.needed) * 100;
                
                return (
                  <div key={i} style={{ marginBottom: '2.5rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'baseline',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{ color: colors.white, fontWeight: '600', fontSize: '1rem' }}>
                        {gap.gap}
                      </div>
                      <div style={{ 
                        color: colors.red, 
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.95rem',
                        fontWeight: '600'
                      }}>
                        Gap: {gap.deficit} companies
                      </div>
                    </div>
                    
                    <div style={{ 
                      position: 'relative', 
                      height: '32px', 
                      background: colors.slate800,
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        height: '100%',
                        width: `${currentPercent}%`,
                        background: colors.slate700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {gap.current > 0 && (
                          <span style={{ color: colors.white, fontSize: '11px', fontWeight: '600' }}>
                            {gap.current} current
                          </span>
                        )}
                      </div>
                      <div style={{ 
                        position: 'absolute',
                        left: `${currentPercent}%`,
                        top: '0',
                        height: '100%',
                        width: `${deficitPercent}%`,
                        background: colors.red,
                        opacity: '0.8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: colors.white, fontSize: '11px', fontWeight: '600' }}>
                          {gap.deficit} needed
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: colors.slate400 }}>
                      Current: {gap.current} | Target: {gap.needed}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              background: 'rgba(239, 68, 68, 0.1)',
              borderLeft: `4px solid ${colors.red}`,
              paddingLeft: '1.5rem',
              borderRadius: '4px'
            }}>
              <div style={{ color: colors.red, fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                Partnership-Dependent Pipeline
              </div>
              <div style={{ color: colors.slate200, lineHeight: '1.6' }}>
                AI-native companies (<strong>151 needed</strong>) represent fastest-growing segment but require 
                NVIDIA/AMD ecosystem introductions. Current database weighted toward HPC/Research (29%) 
                rather than AI production enterprises (3%).
              </div>
            </div>
          </div>
        )}

        {/* PAGE: Evidence & Citations */}
        {activePage === 'citations' && (
          <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '1rem' }}>
            <div style={{ 
              margin: '1rem 0 2rem', 
              padding: '1.5rem', 
              background: 'rgba(6, 182, 212, 0.1)',
              border: `1px solid rgba(6, 182, 212, 0.3)`,
              borderRadius: '6px'
            }}>
              <div style={{ color: colors.cyan, fontWeight: '600', marginBottom: '0.75rem' }}>
                Research Methodology
              </div>
              <div style={{ color: colors.slate400, fontSize: '0.9rem', lineHeight: '1.6' }}>
                Analysis combines quantitative database data from HubSpot CRM (28,023 companies) with qualitative 
                insights from strategic planning documents, technical specifications, and competitive intelligence. 
                Segmentation uses AI deployment maturity crossed with infrastructure models to identify addressable 
                market and revenue potential.
              </div>
            </div>

            {/* Database Evidence */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                color: colors.white, 
                marginBottom: '1.5rem',
                fontWeight: '400'
              }}>
                Database Composition Evidence
              </h3>
              
              <EvidenceItem
                type="internal"
                typeLabel="Internal Data"
                claim={<>Database size: <span style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: colors.rockyGreen,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '3px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600'
                }}>28,023 companies</span> analyzed</>}
                sources={[
                  { num: 1, label: 'HubSpot CRM Database', detail: 'Internal: CIQ HubSpot instance, exported November 2025' },
                  { num: 2, label: 'Segmentation Analysis', detail: 'Source: rlc_ai_market_segmentation_analysis.md' }
                ]}
                methodology={{
                  title: 'Analysis Method',
                  content: 'Segmented by company type, industry vertical, lifecycle stage, and CS tier. Cross-referenced with Tech Preview data and revenue projections using 10-20% enterprise software conversion rates.'
                }}
              />

              <EvidenceItem
                type="internal"
                typeLabel="Customer Data"
                claim={<>AI-Native Production: Only <span style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: colors.rockyGreen,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '3px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600'
                }}>50 companies (0.2%)</span> in database</>}
                sources={[
                  { num: 3, label: 'Identified Customers', detail: 'Jump Trading (Customer, High CS) | Verifone UK (Customer, Medium CS) | Oracle AI/ML teams (Customer) | Nebius (Prospect) | Abacus.ai (Prospect)' },
                  { num: 4, label: 'HubSpot Query', detail: 'Filter: "AI" OR "ML" in description AND ("Production" OR "Inference" OR "Scale") AND CS Tier ≥ Medium' }
                ]}
              />
            </div>

            {/* Performance Evidence */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: colors.white, marginBottom: '1.5rem', fontWeight: '400' }}>
                Performance & Technical Evidence
              </h3>
              
              <EvidenceItem
                type="technical"
                typeLabel="Benchmark Data"
                claim={<>Performance improvements: <span style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: colors.rockyGreen,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '3px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600'
                }}>6-20%</span> validated across workloads</>}
                sources={[
                  { num: 5, label: 'Image Segmentation', detail: 'RLC-AI RC2: 17.97 img/s vs Ubuntu 25.10: 15.90 img/s = 13% faster | vs Ubuntu 24.X: 14.94 img/s = 20% faster' },
                  { num: 6, label: 'Image Detection', detail: 'RLC-AI RC2: 33.63 img/s vs Rocky 9: 31.48 img/s = 6.8% faster' },
                  { num: 7, label: 'Test Configuration', detail: 'NVIDIA A30 (23.6GB, Compute 8.0) | PyTorch 2.8.0, CUDA 12.8, FP16 | Source: Performance_Validation_Section.md' }
                ]}
              />

              <EvidenceItem
                type="internal"
                typeLabel="Technical Documentation"
                claim={<>Hardware underutilization: <span style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: colors.rockyGreen,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '3px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600'
                }}>30-50%</span> typical GPU utilization</>}
                sources={[
                  { num: 8, label: 'Product Requirements', detail: 'Source: rlc_ai_complete_product_requirements.md | "Standard Enterprise Linux distributions achieve only 30-50% of theoretical AI hardware performance"' },
                  { num: 9, label: 'Business Strategy', detail: 'Source: rlc_ai_business_strategy.md | "Organizations achieving only 30-50% of AI hardware theoretical performance"' }
                ]}
              />
            </div>

            {/* Revenue Evidence */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: colors.white, marginBottom: '1.5rem', fontWeight: '400' }}>
                Revenue Projections Evidence
              </h3>
              
              <EvidenceItem
                type="internal"
                typeLabel="Financial Modeling"
                claim={<>Revenue potential: <span style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: colors.rockyGreen,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '3px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600'
                }}>$4M-$6.8M</span> from existing base (40-68 customers)</>}
                sources={[
                  { num: 10, label: 'Revenue Table', detail: 'Source: rlc_ai_market_segmentation_analysis.md, Revenue Opportunity Sizing | Segment-specific conversion rates × addressable targets' },
                  { num: 11, label: 'Conversion Assumptions', detail: 'AI-Native: 12-20% | AI Scaling: 10-15% | HPC/Research: 10-20% | Cloud-Native: 5-10% | Based on enterprise software benchmarks' }
                ]}
                methodology={{
                  title: 'Revenue Calculation',
                  content: 'Formula: (Companies in Base) × (Realistic Target %) × (Conversion Rate) × (Avg Deal Size). Deal sizes $100K-$300K/year based on $300/node pricing × 500-node average deployment.'
                }}
              />

              <EvidenceItem
                type="internal"
                typeLabel="Pricing Model"
                claim={<>Pricing: <span style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: colors.rockyGreen,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '3px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600'
                }}>$300/node</span> average, $200K for 500 nodes</>}
                sources={[
                  { num: 12, label: 'Product Requirements', detail: 'Source: rlc_ai_complete_product_requirements.md | "Node-Based Subscription: $200,000 for 500 nodes ($300/node average)"' },
                  { num: 13, label: 'Business Strategy', detail: 'Source: rlc_ai_business_strategy.md | "Subscription-based pricing: $300/node average, $200K for 500 nodes"' }
                ]}
              />
            </div>

            {/* Market Gaps Evidence */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: colors.white, marginBottom: '1.5rem', fontWeight: '400' }}>
                Critical Market Gaps
              </h3>
              
              <EvidenceItem
                type="internal"
                typeLabel="Gap Analysis"
                claim={<>AI-Native Tech: <span style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: colors.red,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '3px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '600'
                }}>&lt;50 in database</span> (&lt;0.2%) despite fastest-growing segment</>}
                sources={[
                  { num: 14, label: 'Database Gap', detail: 'Source: rlc_ai_market_segmentation_analysis.md | "<50 AI-native companies in 28,023-company database | Missing: AI model providers, infrastructure companies, MLOps platforms"' },
                  { num: 15, label: 'Missing Companies', detail: 'Not in database: Anthropic, Cohere, Mistral | Replicate, Modal, RunPod, Lambda Labs | Weights & Biases, Determined AI' }
                ]}
              />

              <EvidenceItem
                type="competitive"
                typeLabel="Competitive Intel"
                claim="RHEL AI: IBM Granite lock-in, 12-18 month hardware lag"
                sources={[
                  { num: 16, label: 'Competitive Analysis', detail: 'Source: rlc_ai_complete_product_requirements.md | "RHEL AI: IBM Granite model lock-in, older kernel (12-18 month delay), convenience over performance"' },
                  { num: 17, label: 'Business Strategy', detail: 'Source: rlc_ai_business_strategy.md | "RHEL AI: Vendor lock-in (IBM models), 12-18 month hardware support lag"' }
                ]}
              />
            </div>

            {/* Quality Assessment */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.05))',
              border: `1px solid ${colors.rockyGreen}`,
              padding: '2rem',
              borderRadius: '8px',
              marginTop: '3rem'
            }}>
              <div style={{ color: colors.rockyGreen, fontWeight: '600', fontSize: '1.2rem', marginBottom: '1rem' }}>
                Evidence Quality Assessment
              </div>
              <div style={{ color: colors.slate200, fontSize: '1rem', lineHeight: '1.7' }}>
                Analysis draws primarily from <strong>internal CIQ data sources</strong> (HubSpot CRM, strategic planning, 
                technical specs). All database metrics directly traceable to source records.
                <br/><br/>
                <strong>Limitations:</strong> Market sizing estimates and competitive positioning rely on planning 
                documents requiring external validation. Revenue projections assume typical enterprise conversion rates 
                not yet validated through RLC-AI sales.
                <br/><br/>
                <strong>Confidence:</strong> High (database composition), Moderate (revenue projections), 
                Lower (market share estimates requiring validation).
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketSegmentationAnalysis;
