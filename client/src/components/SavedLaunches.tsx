import {
  useGetSavedLaunchesQuery,
  useRemoveLaunchMutation,
  type SavedLaunch,
} from "../api";

export default function SavedLaunches() {
  const { data: savedLaunchesData, error } = useGetSavedLaunchesQuery();
  const [removeLaunch, { isLoading: isRemoving }] = useRemoveLaunchMutation();

  const handleRemove = async (id: string) => {
    try {
      await removeLaunch(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };
  if (error) return <p>Error loading saved launches</p>;
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {savedLaunchesData?.map((launch: SavedLaunch) => (
        <div
          key={launch._id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-bold">{launch.launch_name}</h2>
          <p>Flight Number: {launch.flight_number}</p>
          <p>Date: {new Date(launch.launch_date).toLocaleString()}</p>
          <button
            onClick={() => handleRemove(launch._id)}
            disabled={isRemoving}
          >
            {isRemoving ? "Removing..." : "Remove"}
          </button>
        </div>
      ))}
    </div>
  );
}
