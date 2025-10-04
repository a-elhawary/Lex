"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface TimelineItem {
  date: string;
  event: string;
  description: string;
  actor?: string;
  authorizedBy?: string;
  details?: string[];
}

interface MindmapProps {
  caseTitle: string;
  timeline: TimelineItem[];
  caseId?: string;
}

export default function Mindmap({ caseTitle, timeline, caseId }: MindmapProps) {
  const getEventLink = (event: string) => {
    if (!caseId) return "#";

    // Map events to corresponding sections
    if (event.toLowerCase().includes("document")) {
      return `/cases/${caseId}?tab=documents`;
    }
    if (event.toLowerCase().includes("note") || event.toLowerCase().includes("opened")) {
      return `/cases/${caseId}?tab=notes`;
    }
    if (event.toLowerCase().includes("complaint") || event.toLowerCase().includes("filed")) {
      return `/cases/${caseId}?tab=timeline`;
    }
    // Default to timeline tab
    return `/cases/${caseId}?tab=timeline`;
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-max p-8">
        {/* Root Node */}
        <div className="flex flex-col items-center">
          <Card className="p-4 bg-primary text-primary-foreground mb-8">
            <h3 className="text-lg font-bold">{caseTitle}</h3>
            <p className="text-sm opacity-90">Case Timeline</p>
          </Card>

          {/* Timeline Events as Branches */}
          <div className="flex flex-wrap justify-center gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Connection Line */}
                <div className="w-px h-8 bg-border mb-4"></div>

                {/* Event Node */}
                <Link href={getEventLink(item.event)}>
                  <Card className="p-4 bg-secondary text-secondary-foreground min-w-[200px] mb-4 hover:bg-secondary/80 transition-colors cursor-pointer">
                    <div className="text-center">
                      <h4 className="font-semibold text-sm">{item.event}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                      <p className="text-xs mt-2">{item.description}</p>
                      {item.actor && (
                        <p className="text-xs mt-2 font-medium">
                          Actor:{" "}
                          <Link href={`/teams/${encodeURIComponent(item.actor)}`} className="text-primary hover:underline">
                            {item.actor}
                          </Link>
                        </p>
                      )}
                      {item.authorizedBy && (
                        <p className="text-xs mt-1">
                          Authorized by:{" "}
                          {item.authorizedBy === "Senior Partner" ? (
                            item.authorizedBy
                          ) : (
                            <Link href={`/teams/${encodeURIComponent(item.authorizedBy)}`} className="text-primary hover:underline">
                              {item.authorizedBy}
                            </Link>
                          )}
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>

                {/* Sub-details as Child Nodes */}
                {item.details && item.details.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {item.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center">
                        {/* Sub-connection Line */}
                        <div className="w-4 h-px bg-border mr-2"></div>
                        <Card className="p-2 bg-muted text-muted-foreground text-xs min-w-[150px]">
                          {detail}
                        </Card>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
