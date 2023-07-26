import UpdateSettingsForm from '../ui/UpdateSettingsForm';

function settings() {
  return (
    <div
      className="mx-auto w-full max-w-3xl rounded-md border border-yellow-400
                 h-fit bg-white shadow-lg px-5 py-4"
    >
      <UpdateSettingsForm />
    </div>
  );
}

export default settings;
