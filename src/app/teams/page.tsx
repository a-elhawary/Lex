"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeamsPage() {
  const departments = [
    {
      name: "Dispute Resolution",
      seniority: [
        {
          level: "Managing Partner",
          members: ["Johnathan Smith", "Elizabeth Johnson"]
        },
        {
          level: "Partner",
          members: ["Michael Davis", "Sarah Wilson"]
        },
        {
          level: "Senior Associate",
          members: ["David Brown", "Emily Taylor"]
        },
        {
          level: "Associate",
          members: ["Robert Miller", "Jessica Anderson"]
        },
        {
          level: "Junior Associate",
          members: ["Christopher Lee", "Amanda White"]
        },
        {
          level: "Paralegal",
          members: ["Kevin Garcia", "Laura Martinez"]
        }
      ]
    },
    {
      name: "M&A",
      seniority: [
        {
          level: "Managing Partner",
          members: ["Richard Thompson"]
        },
        {
          level: "Partner",
          members: ["Patricia Rodriguez", "Daniel Moore"]
        },
        {
          level: "Senior Associate",
          members: ["Jennifer Jackson", "Matthew Harris"]
        },
        {
          level: "Associate",
          members: ["Andrew Clark", "Olivia Lewis"]
        },
        {
          level: "Junior Associate",
          members: ["James Walker", "Sophia Hall"]
        },
        {
          level: "Paralegal",
          members: ["Benjamin Young", "Isabella King"]
        }
      ]
    },
    {
      name: "Corporate",
      seniority: [
        {
          level: "Managing Partner",
          members: ["William Wright"]
        },
        {
          level: "Partner",
          members: ["Margaret Lopez", "Charles Hill"]
        },
        {
          level: "Senior Associate",
          members: ["Barbara Green", "Joseph Adams"]
        },
        {
          level: "Associate",
          members: ["Susan Baker", "Thomas Nelson"]
        },
        {
          level: "Junior Associate",
          members: ["Dorothy Carter", "George Mitchell"]
        },
        {
          level: "Paralegal",
          members: ["Helen Perez", "Edward Roberts"]
        }
      ]
    },
    {
      name: "Intellectual Property",
      seniority: [
        {
          level: "Managing Partner",
          members: ["Frank Turner"]
        },
        {
          level: "Partner",
          members: ["Deborah Phillips", "Ronald Campbell"]
        },
        {
          level: "Senior Associate",
          members: ["Lisa Parker", "Anthony Evans"]
        },
        {
          level: "Associate",
          members: ["Nancy Edwards", "Steven Collins"]
        },
        {
          level: "Junior Associate",
          members: ["Betty Stewart", "Paul Sanchez"]
        },
        {
          level: "Paralegal",
          members: ["Sandra Morris", "Mark Rogers"]
        }
      ]
    },
    {
      name: "Employment Law",
      seniority: [
        {
          level: "Managing Partner",
          members: ["Donald Reed"]
        },
        {
          level: "Partner",
          members: ["Carol Cook", "Kenneth Morgan"]
        },
        {
          level: "Senior Associate",
          members: ["Michelle Bell", "Eric Murphy"]
        },
        {
          level: "Associate",
          members: ["Sharon Bailey", "Scott Rivera"]
        },
        {
          level: "Junior Associate",
          members: ["Ruth Cooper", "Brian Richardson"]
        },
        {
          level: "Paralegal",
          members: ["Shirley Cox", "Alan Howard"]
        }
      ]
    }
  ];

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Our Teams</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Meet the professionals across our practice areas.
        </p>
      </div>

      {/* Departments */}
      <div className="space-y-8">
        {departments.map((dept, deptIndex) => (
          <div key={deptIndex}>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{dept.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dept.seniority.map((senior, seniorIndex) => (
                <Card key={seniorIndex} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{senior.level}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {senior.members.map((member, memberIndex) => (
                        <li key={memberIndex} className="text-sm text-muted-foreground">
                          <Link
                            href={`/teams/${encodeURIComponent(member)}`}
                            className="hover:text-primary transition-colors"
                          >
                            {member}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
