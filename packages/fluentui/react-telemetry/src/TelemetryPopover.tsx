import { StylesContextInputValue, Telemetry } from '@fluentui/react-bindings';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-fela';

import * as styles from './styles';
import { TelemetryTable } from './TelemetryTable';
import { useTelemetryState } from './useTelemetryState';
import { TelemetryPerfFlags } from './TelemetryPerfFlags';

export type TelemetryPopoverProps = { mountNode?: HTMLElement };

export const TelemetryPopover: React.FC<TelemetryPopoverProps> = props => {
  const { children, mountNode = document.body } = props;

  const telemetry = React.useMemo(() => new Telemetry(), []);
  const [state, dispatch] = useTelemetryState();

  const outgoingContext = React.useMemo<Partial<StylesContextInputValue>>(
    () => ({
      performance: state.performanceFlags,
      telemetry: telemetry,
    }),
    [telemetry, state.performanceFlags],
  );

  return (
    <>
      <ThemeProvider theme={outgoingContext} overwrite>
        {children}
      </ThemeProvider>

      {ReactDOM.createPortal(
        <div style={styles.panel()}>
          {state.activeTab === 'telemetry' && (
            <TelemetryTable
              expandStyles={state.tableExpandStyles}
              componentFilter={state.tableComponentFilter}
              sort={state.tableSort}
              telemetry={telemetry}
              onComponentFilterChange={filter => dispatch({ type: 'SET_TABLE_COMPONENT_FILTER', value: filter })}
              onExpandStylesChange={show => dispatch({ type: 'SET_TABLE_EXPAND_STYLES', value: show })}
              onSortChange={value => dispatch({ type: 'SET_TABLE_SORT', value })}
            />
          )}
          {state.activeTab === 'performance-flags' && (
            <TelemetryPerfFlags
              flags={state.performanceFlags}
              onChange={(name, value) => dispatch({ type: 'SET_PERFORMANCE_FLAG', name, value })}
            />
          )}

          {state.activeTab === 'help' && (
            <div style={styles.help()}>
              <b>TBD</b>
            </div>
          )}

          <div style={styles.tabs()}>
            <button
              style={styles.tab({ active: state.activeTab === 'telemetry' })}
              onClick={() => dispatch({ type: 'SET_TELEMETRY_TAB', tab: 'telemetry' })}
            >
              Telemetry data
            </button>
            <button
              style={styles.tab({ active: state.activeTab === 'performance-flags' })}
              onClick={() => dispatch({ type: 'SET_TELEMETRY_TAB', tab: 'performance-flags' })}
            >
              Performance flags
            </button>
            <button
              style={styles.tab({ active: state.activeTab === 'help' })}
              onClick={() => dispatch({ type: 'SET_TELEMETRY_TAB', tab: 'help' })}
            >
              Help
            </button>
          </div>
        </div>,
        mountNode,
      )}
    </>
  );
};
