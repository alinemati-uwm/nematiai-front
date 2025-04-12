import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import MarkdownRenderer from "@/components/shared/markdown-rendered/MarkdownRendered";
import { useTheme } from "@/hooks/useTheme";
import { APP_VERSION } from "@/constants/app-info";
import { QUERY_KEYS } from "@/refactor_lib/constants/queryKeys";
import changeLogsApi from "@/refactor_lib/services/api/v1/changeLogs";

import AboutLoadingSkeleton from "./AboutLoadingSkeleton";
import styles from "./style.module.css";

/**
 * about panel in user panel dialog
 * @constructor
 * @returns about panel
 */
export default function About() {
  const { data, isPending } = useQuery({
    queryKey: QUERY_KEYS.changeLog.about,
    queryFn: changeLogsApi.about,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { activeTheme } = useTheme();

  return (
    <div className="px-6 pb-10 my-5 bg-holder-lighter">
      {!isPending ? (
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <Image
            src="/images/common/logo.svg"
            alt="nerd studio logo"
            width={60}
            height={60}
            className="bg-muted  rounded-full p-3"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold text-label">Nemati.ai</p>
            <p className="text-label-light">
              Version {APP_VERSION}-release.202405300321
            </p>
            <strong className="mt-2">{data?.title}</strong>
            {data?.about && (
              <div
                className={`mt-1 ${styles.markdown} ${activeTheme.includes("-dark") ? styles.dark : ""}`}
              >
                <MarkdownRenderer content={data.about} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <AboutLoadingSkeleton />
      )}
    </div>
  );
}
