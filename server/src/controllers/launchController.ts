import type { Request, Response } from "express";
import LaunchModel from "../model/launchModel";

const SPACEX_URL = "https://api.spacexdata.com/v5/launches/query";

export interface SpaceXLaunch {
  flight_number: string;
  launch_name: string;
  launch_date: Date;
}

export const getLaunches = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const api_response = await fetch(`${SPACEX_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: {},
        options: {
          limit: 30,
          sort: { date_utc: "desc" },
          select: ["flight_number", "name", "date_utc"],
        },
      }),
    });
    const data = await api_response.json();
    const launches: SpaceXLaunch[] = data.docs.map((launch: any) => ({
      flight_number: launch.flight_number,
      launch_name: launch.name,
      launch_date: new Date(launch.date_utc),
    }));
    res.json(launches);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch launches" });
  }
};

export const saveLaunch = async (req: Request, res: Response) => {
  try {
    const { flight_number, launch_name, launch_date } = req.body;
    console.log("Received launch data:", req.body);

    const newLaunch = new LaunchModel({
      flight_number: String(flight_number),
      launch_name,
      launch_date: new Date(launch_date),
    });

    await newLaunch.save();
    res.status(201).json(newLaunch);
  } catch (error) {
    console.error("Erreur saveLaunch:", error, "Body received:", req.body);
    res.status(500).json({
      error: "Failed to save launch",
      details: req.body,
      exception: error,
    });
  }
};

export const getSavedLaunches = async (req: Request, res: Response) => {
  try {
    const launches = await LaunchModel.find().sort({ createdAt: -1 });
    res.json(launches);
  } catch (error) {
    console.error("Erreur getSavedLaunches:", error);
    res.status(500).json({ error: "Failed to fetch saved launches" });
  }
};

export const deleteLaunch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await LaunchModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete launch" });
  }
};
