import { useForm } from 'react-hook-form';
import FormRow from './FormRow';
import { useSettings } from '../features/settings/useSettings';
import Loading from '../../ui/Loading';
import { useUpdateSettings } from '../features/settings/useUpdateSettings';

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();

  const { updateSettings, isUpdating } = useUpdateSettings();

  if (isLoading) return <Loading />;

  const { priorityPrice, duration, startAt, endAt } = settings;

  function handleBlur(e, field) {
    let { value } = e.target;
    if (field === 'priorityPrice') {
      value = value * 0.01;
    }
    if (!value) return;

    if (value != settings[field]) updateSettings({ [field]: value });
  }

  return (
    <form className="flex w-full max-w-sm flex-col gap-6">
      <FormRow label={'Priority Price'}>
        <input
          defaultValue={Number(priorityPrice) * 100}
          className="rounded border-2 border-yellow-400 bg-white px-2 py-0.5 
                    focus:border-sky-600 focus:outline-none"
          type="number"
          id="priority-price"
          onBlur={(e) => handleBlur(e, 'priorityPrice')}
          max="50"
        />
      </FormRow>
      <FormRow label={'Cooking Duration'}>
        <input
          defaultValue={duration}
          className="rounded border-2 border-yellow-400 bg-white px-2 py-0.5 
                    focus:border-sky-600 focus:outline-none"
          type="number"
          id="duration"
          onBlur={(e) => handleBlur(e, 'duration')}
          max="60"
        />
      </FormRow>
      <FormRow label={'Start Working At'}>
        <input
          defaultValue={startAt}
          className="rounded border-2 border-yellow-400 bg-white px-2 py-0.5 
                    focus:border-sky-600 focus:outline-none"
          type="time"
          id="startAt"
          onBlur={(e) => handleBlur(e, 'startAt')}
        />
      </FormRow>
      <FormRow label={'Stop Working At'}>
        <input
          defaultValue={endAt}
          className="rounded border-2 border-yellow-400 bg-white px-1 py-0.5 
                    focus:border-sky-600 focus:outline-none"
          type="time"
          id="endAt"
          onBlur={(e) => handleBlur(e, 'endAt')}
        />
      </FormRow>
    </form>
  );
}

export default UpdateSettingsForm;
