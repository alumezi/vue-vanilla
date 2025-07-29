import { useMemo, useState, useEffect } from 'preact/hooks';
import { useReactPerformanceMeasure } from '../utils/performanceUtils';

function PreactHeavyChild() {
  const [renderTime, setRenderTime] = useState(null);
  const { startMeasure } = useReactPerformanceMeasure('preact');

  // Calculate total number of nodes for display
  const nodeCount = useMemo(() => {
    // 50 rows * 10 items * 8 nested elements per item = 4000 nodes
    return 50 * 10 * 8;
  }, []);

  useEffect(() => {
    const endMeasure = startMeasure();
    // Use setTimeout to measure after DOM is fully rendered
    setTimeout(() => {
      setRenderTime(endMeasure());
    }, 0);
  }, []);

  return (
    <div style={{
      margin: '20px 0',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      backgroundColor: '#fafafa'
    }}>
      <h4 style={{
        color: '#42b883',
        margin: '0 0 10px 0',
        fontSize: '1.1em'
      }}>
        Preact Heavy Child Component
      </h4>
      <p>This component contains {nodeCount} DOM nodes for performance testing</p>
      {renderTime && (
        <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '10px' }}>
          Last render time: {renderTime.toFixed(2)}ms
        </p>
      )}
      
      {/* Generate many nested divs with different content */}
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        border: '1px solid #eee',
        borderRadius: '4px',
        backgroundColor: 'white'
      }}>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '5px',
            borderBottom: '1px solid #f0f0f0'
          }}>
            {Array.from({ length: 10 }, (_, j) => (
              <div key={`${i}-${j}`} style={{
                flex: 1,
                minWidth: '120px',
                margin: '2px',
                padding: '8px',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                backgroundColor: '#f8f9fa',
                fontSize: '0.8em'
              }}>
                <span style={{
                  display: 'block',
                  fontWeight: 'bold',
                  color: '#42b883',
                  marginBottom: '4px'
                }}>
                  {i * j}
                </span>
                <div style={{ fontSize: '0.7em' }}>
                  <div style={{
                    padding: '2px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '2px'
                  }}>
                    <div style={{
                      padding: '2px',
                      backgroundColor: '#e8e8e8',
                      borderRadius: '2px'
                    }}>
                      <div style={{
                        padding: '2px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '2px'
                      }}>
                        <span style={{
                          display: 'block',
                          fontWeight: 500,
                          color: '#333',
                          marginBottom: '2px'
                        }}>
                          Node {i}-{j}
                        </span>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1px'
                        }}>
                          <span style={{
                            fontSize: '0.6em',
                            color: '#666',
                            padding: '1px 2px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '1px'
                          }}>
                            ID: {i * 1000 + j}
                          </span>
                          <span style={{
                            fontSize: '0.6em',
                            color: '#666',
                            padding: '1px 2px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '1px'
                          }}>
                            Type: {(i + j) % 3 === 0 ? 'Primary' : (i + j) % 3 === 1 ? 'Secondary' : 'Tertiary'}
                          </span>
                          <span style={{
                            fontSize: '0.6em',
                            color: '#666',
                            padding: '1px 2px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '1px'
                          }}>
                            Status: {(i + j) % 2 === 0 ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreactHeavyChild; 