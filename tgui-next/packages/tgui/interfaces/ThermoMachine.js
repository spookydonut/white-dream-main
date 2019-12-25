import { toFixed } from 'common/math';
import { Fragment } from 'inferno';
import { useBackend } from '../backend';
import { AnimatedNumber, Button, LabeledList, NumberInput, Section } from '../components';

export const ThermoMachine = props => {
  const { act, data } = useBackend(props);
  return (
    <Fragment>
      <Section title="Status">
        <LabeledList>
          <LabeledList.Item label="Температура">
            <AnimatedNumber
              value={data.temperature}
              format={value => toFixed(value, 2)} />
            {' K'}
          </LabeledList.Item>
          <LabeledList.Item label="Давление">
            <AnimatedNumber
              value={data.pressure}
              format={value => toFixed(value, 2)} />
            {' кПа'}
          </LabeledList.Item>
        </LabeledList>
      </Section>
      <Section
        title="Управление"
        buttons={(
          <Button
            icon={data.on ? 'power-off' : 'times'}
            content={data.on ? 'Вкл' : 'Выкл'}
            selected={data.on}
            onClick={() => act('power')} />
        )}>
        <LabeledList>
          <LabeledList.Item label="Целевая температура">
            <NumberInput
              animated
              value={Math.round(data.target)}
              unit="K"
              width="62px"
              minValue={Math.round(data.min)}
              maxValue={Math.round(data.max)}
              step={5}
              stepPixelSize={3}
              onDrag={(e, value) => act('target', {
                target: value,
              })} />
          </LabeledList.Item>
          <LabeledList.Item label="Presets">
            <Button
              icon="fast-backward"
              disabled={data.target === data.min}
              title="Минимальная температура"
              onClick={() => act('target', {
                target: data.min,
              })} />
            <Button
              icon="sync"
              disabled={data.target === data.initial}
              title="Комнатная температура"
              onClick={() => act('target', {
                target: data.initial,
              })} />
            <Button
              icon="fast-forward"
              disabled={data.target === data.max}
              title="Максимальная температура"
              onClick={() => act('target', {
                target: data.max,
              })} />
          </LabeledList.Item>
        </LabeledList>
      </Section>
    </Fragment>
  );
};
