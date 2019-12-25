import { Fragment } from 'inferno';
import { useBackend } from '../backend';
import { Button, LabeledList, Section } from '../components';

export const TurbineComputer = props => {
  const { act, data } = useBackend(props);
  const operational = Boolean(data.compressor
    && !data.compressor_broke
    && data.turbine
    && !data.turbine_broke);
  return (
    <Section
      title="Состояние"
      buttons={(
        <Fragment>
          <Button
            icon={data.online ? 'power-off' : 'times'}
            content={data.online ? 'Включена' : 'Отключена'}
            selected={data.online}
            disabled={!operational}
            onClick={() => act('toggle_power')} />
          <Button
            icon="sync"
            content="Переподключить"
            onClick={() => act('reconnect')} />
        </Fragment>
      )}>
      {!operational && (
        <LabeledList>
          <LabeledList.Item
            label="Состояние компрессора"
            color={(!data.compressor || data.compressor_broke)
              ? 'bad'
              : 'good'}>
            {data.compressor_broke
              ? data.compressor ? 'Выключен' : 'Отсутствует'
              : 'Включен'}
          </LabeledList.Item>
          <LabeledList.Item
            label="Состояние турбины"
            color={(!data.turbine || data.turbine_broke)
              ? 'bad'
              : 'good'}>
            {data.turbine_broke
              ? data.turbine ? 'Выключена' : 'Отсутствует'
              : 'Включена'}
          </LabeledList.Item>
        </LabeledList>
      ) || (
        <LabeledList>
          <LabeledList.Item label="Скорость турбины">
            {data.rpm} ОВМ
          </LabeledList.Item>
          <LabeledList.Item label="Внутренняя температура">
            {data.temp} K
          </LabeledList.Item>
          <LabeledList.Item label="Генерируемая мощность">
            {data.power}
          </LabeledList.Item>
        </LabeledList>
      )}
    </Section>
  );
};
