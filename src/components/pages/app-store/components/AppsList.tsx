import AppCard from "@/components/pages/app-store/components/AppCard";
import { apps } from "@/constants/spaces";

//list of app showed in app store
export function AppsList() {
  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {/*
       * 1 item in a row in mobile 2 in tablet and more and 3 in desktop
       */}
      {apps.map(app => (
        <AppCard app={app} key={app.id} />
      ))}
    </section>
  );
}
