import {
  useGetLatestLaunchesQuery,
  useGetSavedLaunchesQuery,
  useSaveLaunchMutation,
  type LaunchCore,
  type SavedLaunch,
} from "../api";

export default function LaunchesTable() {
  const { data: launchesData, error: launchesError } =
    useGetLatestLaunchesQuery();
  const { data: savedLaunchesData = [], error: savedLaunchesError } =
    useGetSavedLaunchesQuery();
  const [saveLaunch, { isLoading: isSaving }] = useSaveLaunchMutation();

  const handleSaveLaunch = async (launch: any) => {
    try {
      await saveLaunch(launch).unwrap();
      console.log("Launch saved successfully");
    } catch (error) {
      console.error("Failed to save launch:", error);
    }
  };

  const isLaunchSaved = (launch: LaunchCore, savedLaunch: SavedLaunch[]) => {
    return savedLaunch.some(
      (saved) =>
        Number(saved.flight_number) === launch.flight_number &&
        saved.launch_name === launch.launch_name &&
        new Date(saved.launch_date).toISOString() ===
          new Date(launch.launch_date).toISOString()
    );
  };

  if (launchesError) return <p>Error with launches!</p>;
  if (savedLaunchesError) return <p>Error with saved launches!</p>;

  return (
    <table className="min-w-full border-collapse table-auto mt-10">
      <thead>
        <tr>
          <th className="px-4 py-2 text-center border-b">Flight Number</th>
          <th className="px-4 py-2 text-center border-b">Name</th>
          <th className="px-4 py-2 text-center border-b">Date</th>
        </tr>
      </thead>
      <tbody>
        {launchesData?.map((launch: LaunchCore, index) => {
          const isSaved = isLaunchSaved(launch, savedLaunchesData);
          return (
            <tr key={`${index}`}>
              <td className="p-2 border-b">{launch.flight_number}</td>
              <td className="p-2 border-b">{launch.launch_name}</td>
              <td className="p-2 border-b">
                {new Date(launch.launch_date).toLocaleString("de-DE", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="p-2">
                <button
                  className="disabled:opacity-50"
                  onClick={() => handleSaveLaunch(launch)}
                  disabled={isSaved || isSaving}
                >
                  {isSaved ? "Saved" : "Save"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
