"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Mindmap from "@/components/Mindmap";
import { TimeEntry } from "@/types/billing";

type Hearing = {
  id: string;
  type: 'court' | 'deposition';
  date: string;
  place: string;
  time: string;
  attendance: string;
  transpired: string;
  minutes: string;
  recording: File | null;
  submittedByParties: string;
  finalDecision: string;
};

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const caseId = params.caseId as string;
  const [newNote, setNewNote] = useState("");
  const [showFeeDialog, setShowFeeDialog] = useState(false);
  const [fees, setFees] = useState([
    {
      id: "1",
      type: "court",
      description: "Filing fee for initial complaint",
      amount: 450.00,
      date: "2024-01-15",
      billable: true,
      invoiceId: "INV-001"
    },
    {
      id: "2",
      type: "translation",
      description: "Document translation services",
      amount: 125.00,
      date: "2024-01-20",
      billable: true,
      invoiceId: null
    },
    {
      id: "3",
      type: "authentication",
      description: "Document authentication and notarization",
      amount: 75.00,
      date: "2024-01-25",
      billable: true,
      invoiceId: null
    }
  ]);

  const [newFee, setNewFee] = useState({
    type: "court",
    description: "",
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    billable: true,
    notes: ""
  });

  const [timelineView, setTimelineView] = useState<'list' | 'mindmap'>('list');
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState("overview");

  const [hearings, setHearings] = useState<Hearing[]>([
    {
      id: "1",
      type: "court",
      date: "2024-02-15",
      place: "Superior Court of California, 850 Bryant Street, San Francisco, CA 94103",
      time: "10:00",
      attendance: "John Doe (Attorney), Michael Johnson (Client), Judge Emily Rodriguez, Defense Attorney Sarah Lee",
      transpired: "Initial hearing for case discovery. Discussed timelines and evidence exchange.",
      minutes: "Court opened at 10:00 AM. Plaintiff presented initial arguments. Defendant requested extension for discovery. Court granted 30-day extension.",
      recording: null,
      submittedByParties: "Plaintiff submitted medical records. Defendant submitted police report.",
      finalDecision: "Discovery extension granted. Next hearing scheduled for March 15, 2024."
    },
    {
      id: "2",
      type: "deposition",
      date: "2024-02-20",
      place: "Law Offices of Doe & Associates, 123 Main Street, San Francisco, CA 94102",
      time: "14:00",
      attendance: "John Doe (Attorney), Michael Johnson (Client), Defense Attorney Sarah Lee, Court Reporter Jane Smith",
      transpired: "Deposition of witness from the accident scene. Witness provided detailed account of events.",
      minutes: "Witness testified about seeing the defendant speeding. Defense counsel cross-examined on visibility conditions.",
      recording: null,
      submittedByParties: "Plaintiff submitted witness affidavit. Defendant submitted weather report.",
      finalDecision: "Deposition completed. No objections noted."
    }
  ]);

  const [showHearingDialog, setShowHearingDialog] = useState(false);
  const [editingHearing, setEditingHearing] = useState<Hearing | null>(null);
  const [newHearing, setNewHearing] = useState<Omit<Hearing, 'id'>>({
    type: "court",
    date: "",
    place: "",
    time: "",
    attendance: "",
    transpired: "",
    minutes: "",
    recording: null,
    submittedByParties: "",
    finalDecision: ""
  });

  const [litigationStrategy, setLitigationStrategy] = useState({
    claimant: {
      talkingPoints: [
        {
          id: '1',
          text: 'The defendant was driving at excessive speed causing the rear-end collision',
          evidence: ['Police report showing defendant speed of 65 mph in 45 mph zone', 'Witness statement from bystander'],
          comments: [
            { id: '1', text: 'Strong evidence from radar gun reading', author: 'John Doe', date: '2024-01-20' }
          ]
        },
        {
          id: '2',
          text: 'Client sustained significant injuries requiring medical treatment',
          evidence: ['Medical records from St. Mary\'s Hospital', 'Doctor\'s report on whiplash and back pain'],
          comments: []
        }
      ]
    },
    defendant: {
      talkingPoints: [
        {
          id: '3',
          text: 'Client was stopped suddenly without warning',
          evidence: ['Defendant\'s statement to police', 'Traffic camera footage'],
          comments: [
            { id: '2', text: 'Need to review the footage for timestamp', author: 'Jane Smith', date: '2024-01-22' }
          ]
        },
        {
          id: '4',
          text: 'Weather conditions contributed to the accident',
          evidence: ['Weather report for the day', 'Road conditions assessment'],
          comments: []
        }
      ]
    }
  });

  const [lawsAndPrecedents, setLawsAndPrecedents] = useState([
    {
      id: '1',
      title: 'California Vehicle Code § 22350',
      description: 'Basic speed law - no person shall drive a vehicle upon a highway at a speed greater than is reasonable or prudent.',
      citation: 'Cal. Veh. Code § 22350'
    },
    {
      id: '2',
      title: 'California Civil Code § 1714',
      description: 'Every one is responsible, not only for the result of his willful acts, but also for an injury occasioned to another by his want of ordinary care or skill.',
      citation: 'Cal. Civ. Code § 1714'
    },
    {
      id: '3',
      title: 'Lien v. Sutro (1892)',
      description: 'Precedent establishing that negligence must be proven by preponderance of evidence in personal injury cases.',
      citation: 'Lien v. Sutro, 101 Cal. 206 (1892)'
    },
    {
      id: '4',
      title: 'California Evidence Code § 352',
      description: 'The court in its discretion may exclude evidence if its probative value is substantially outweighed by the probability that its admission will create substantial danger of undue prejudice.',
      citation: 'Cal. Evid. Code § 352'
    }
  ]);

  const handleAddComment = (pointId: string, side: 'claimant' | 'defendant') => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now().toString(),
      text: newComment,
      author: 'Current User', // In real app, get from auth
      date: new Date().toISOString().split('T')[0]
    };

    setLitigationStrategy(prev => ({
      ...prev,
      [side]: {
        ...prev[side],
        talkingPoints: prev[side].talkingPoints.map(point =>
          point.id === pointId
            ? { ...point, comments: [...point.comments, newCommentObj] }
            : point
        )
      }
    }));

    setNewComment('');
    setCommentingOn(null);
  };

  // Mock data - in a real app, this would be fetched based on caseId
  const caseData = {
    id: caseId,
    title: "Johnson vs. Smith",
    client: "Michael Johnson",
    status: "Active",
    type: "Personal Injury",
    isLitigation: true,
    dateCreated: "2024-01-15",
    nextHearing: "2024-02-20",
    description: "Motor vehicle accident case involving rear-end collision on Highway 101. Client sustained injuries including whiplash and back pain. Seeking compensation for medical expenses, lost wages, and pain and suffering.",
    attorney: "John Doe",
    courtName: "Superior Court of California",
    courtLocation: "850 Bryant Street, San Francisco, CA 94103",
    judges: [
      { name: "Judge Emily Rodriguez", tendency: "Strict on evidence admissibility" },
      { name: "Judge Michael Chen", tendency: "Favors plaintiff in personal injury cases" }
    ],
    circuit: "First Judicial District",
    daysOfOperation: "Monday to Friday, 8:00 AM - 5:00 PM",
    clerk: "Sarah Johnson",
    secretary: "David Lee",
    caseNumber: "CV-2024-001234",
  };

  const documents = [
    {
      id: "1",
      name: "Initial Complaint",
      type: "Legal Document",
      uploadDate: "2024-01-15",
      size: "2.3 MB",
    },
    {
      id: "2",
      name: "Medical Records",
      type: "Evidence",
      uploadDate: "2024-01-18",
      size: "5.7 MB",
    },
    {
      id: "3",
      name: "Police Report",
      type: "Evidence",
      uploadDate: "2024-01-20",
      size: "1.2 MB",
    },
  ];

  const timeline = [
    {
      date: "2024-01-15",
      event: "Case opened",
      description: "Initial consultation completed and case file created",
      actor: "John Doe",
      authorizedBy: "Senior Partner",
      details: [
        "Client intake form completed",
        "Initial fee agreement signed",
        "Case file number assigned: CV-2024-001234"
      ]
    },
    {
      date: "2024-01-18",
      event: "Documents received",
      description: "Medical records and police report obtained",
      actor: "Paralegal Assistant",
      authorizedBy: "John Doe",
      details: [
        "Medical records from St. Mary's Hospital",
        "Police accident report filed",
        "Witness statements collected"
      ]
    },
    {
      date: "2024-01-25",
      event: "Complaint filed",
      description: "Initial complaint filed with the court",
      actor: "John Doe",
      authorizedBy: "Senior Partner",
      details: [
        "Complaint drafted and reviewed",
        "Filing fee paid: $450",
        "Service of process initiated"
      ]
    },
    {
      date: "2024-02-01",
      event: "Discovery phase",
      description: "Discovery requests sent to opposing counsel",
      actor: "Discovery Specialist",
      authorizedBy: "John Doe",
      details: [
        "Interrogatories prepared",
        "Request for production of documents",
        "Medical examination scheduled"
      ]
    },
  ];

  const notes = [
    {
      id: "1",
      date: "2024-01-15",
      author: "John Doe",
      content: "Client reports severe back pain following the accident. Recommended immediate medical attention.",
    },
    {
      id: "2",
      date: "2024-01-20",
      author: "John Doe",
      content: "Reviewed police report. Clear evidence of defendant's fault. Proceeding with case preparation.",
    },
  ];

  // Mock time entries for this case
  const timeEntries: TimeEntry[] = [
    {
      id: "1",
      date: "2024-01-30",
      client: caseData.client,
      case: caseData.title,
      description: "Review medical records and prepare case summary",
      hours: 3.5,
      rate: 250,
      amount: 875.00,
      billable: true,
      timekeeper: "Johnathan Smith",
    },
    {
      id: "2",
      date: "2024-01-29",
      client: caseData.client,
      case: caseData.title,
      description: "Client consultation and case strategy discussion",
      hours: 2.0,
      rate: 250,
      amount: 500.00,
      billable: true,
      timekeeper: "Elizabeth Johnson",
    },
    {
      id: "3",
      date: "2024-01-28",
      client: caseData.client,
      case: caseData.title,
      description: "Draft initial complaint and motion to compel",
      hours: 4.5,
      rate: 250,
      amount: 1125.00,
      billable: true,
      timekeeper: "Johnathan Smith",
    },
    {
      id: "4",
      date: "2024-01-27",
      client: caseData.client,
      case: caseData.title,
      description: "Research similar cases and legal precedents",
      hours: 3.0,
      rate: 250,
      amount: 750.00,
      billable: true,
      timekeeper: "Michael Davis",
    },
    {
      id: "5",
      date: "2024-01-26",
      client: caseData.client,
      case: caseData.title,
      description: "Administrative work and file organization",
      hours: 1.5,
      rate: 250,
      amount: 375.00,
      billable: false,
      timekeeper: "David Brown",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would make an API call
      console.log("Adding note:", newNote);
      setNewNote("");
    }
  };

  const handleCreateInvoice = () => {
    const billableEntries = timeEntries.filter(entry => entry.billable);
    const totalAmount = billableEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalHours = billableEntries.reduce((sum, entry) => sum + entry.hours, 0);

    // In a real app, this would create an invoice via API
    console.log("Creating invoice for case:", caseData.title);
    console.log("Billable entries:", billableEntries.length);
    console.log("Total amount:", totalAmount);
    console.log("Total hours:", totalHours);

    // Simulate invoice creation
    alert(`Invoice created successfully!\n\nCase: ${caseData.title}\nClient: ${caseData.client}\nTotal Hours: ${totalHours}\nTotal Amount: $${totalAmount.toLocaleString()}\n\nRedirecting to billing page...`);

    // Navigate to billing page
    router.push('/billing');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/cases" className="text-muted-foreground hover:text-foreground">
              Cases
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{caseData.title}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{caseData.title}</h1>
          <p className="text-muted-foreground mt-2">Case #{caseData.caseNumber}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={getStatusColor(caseData.status)}>
            {caseData.status}
          </Badge>
          <Button variant="outline">Edit Case</Button>
        </div>
      </div>

      {/* Case Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-foreground">Name</p>
              <p className="text-sm text-muted-foreground">{caseData.client}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Case Type</p>
              <p className="text-sm text-muted-foreground">{caseData.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Attorney</p>
              <Link href={`/teams/${encodeURIComponent(caseData.attorney)}`} className="text-sm text-primary hover:underline">
                {caseData.attorney}
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Case Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-foreground">Date Created</p>
              <p className="text-sm text-muted-foreground">{caseData.dateCreated}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Next Hearing</p>
              <p className="text-sm text-muted-foreground">{caseData.nextHearing}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Court</p>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-sm text-primary hover:underline text-left">
                    {caseData.courtName}, {caseData.courtLocation}
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Court Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold">Court Information</h3>
                      <p><strong>Name:</strong> {caseData.courtName}</p>
                      <p><strong>Location:</strong> <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(caseData.courtLocation)}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{caseData.courtLocation}</a></p>
                      <p><strong>Circuit:</strong> {caseData.circuit}</p>
                      <p><strong>Days of Operation:</strong> {caseData.daysOfOperation}</p>
                      <p><strong>Clerk:</strong> {caseData.clerk}</p>
                      <p><strong>Secretary:</strong> {caseData.secretary}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Case Judges</h3>
                      <div className="space-y-2">
                        {caseData.judges.map((judge, index) => (
                          <div key={index} className="border rounded p-3">
                            <p><strong>Name:</strong> {judge.name}</p>
                            <p><strong>Tendency:</strong> {judge.tendency}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Schedule Hearing
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Upload Document
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="hearings">Hearings</TabsTrigger>
          {caseData.isLitigation && <TabsTrigger value="litigation-strategy">Litigation Strategy</TabsTrigger>}
          <TabsTrigger value="timesheet">Timesheet</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Case Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{caseData.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Case Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex justify-between items-center p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Case Timeline</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={timelineView === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimelineView('list')}
                  >
                    List View
                  </Button>
                  <Button
                    variant={timelineView === 'mindmap' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimelineView('mindmap')}
                  >
                    Mindmap View
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {timelineView === 'list' ? (
                <div className="space-y-4">
                  {timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        {index < timeline.length - 1 && (
                          <div className="w-px h-12 bg-border mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-foreground">{item.event}</p>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            {item.actor && (
                              <p className="text-sm mt-2">
                                <span className="font-medium">Actor:</span>{" "}
                                <Link href={`/teams/${encodeURIComponent(item.actor)}`} className="text-primary hover:underline">
                                  {item.actor}
                                </Link>
                              </p>
                            )}
                            {item.authorizedBy && (
                              <p className="text-sm mt-1">
                                <span className="font-medium">Authorized by:</span>{" "}
                                {item.authorizedBy === "Senior Partner" ? (
                                  item.authorizedBy
                                ) : (
                                  <Link href={`/teams/${encodeURIComponent(item.authorizedBy)}`} className="text-primary hover:underline">
                                    {item.authorizedBy}
                                  </Link>
                                )}
                              </p>
                            )}
                            {item.details && item.details.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium">Details:</p>
                                <ul className="text-sm text-muted-foreground list-disc list-inside mt-1">
                                  {item.details.map((detail, detailIndex) => (
                                    <li key={detailIndex}>{detail}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Mindmap caseTitle={caseData.title} timeline={timeline} caseId={caseId} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hearings">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Case Hearings</CardTitle>
                <Button onClick={() => { setEditingHearing(null); setNewHearing({...newHearing, date: new Date().toISOString().split('T')[0]}); setShowHearingDialog(true); }}>Add New Hearing</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hearings.map((hearing) => (
                  <Card key={hearing.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{hearing.type === 'court' ? 'Court Hearing' : 'Deposition'} - {hearing.date}</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => { setEditingHearing(hearing); setNewHearing({type: hearing.type, date: hearing.date, place: hearing.place, time: hearing.time, attendance: hearing.attendance, transpired: hearing.transpired, minutes: hearing.minutes, recording: hearing.recording, submittedByParties: hearing.submittedByParties, finalDecision: hearing.finalDecision}); setShowHearingDialog(true); }}>Edit</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div><strong>Place:</strong> {hearing.place}</div>
                      <div><strong>Time:</strong> {hearing.time}</div>
                      <div><strong>Attendance:</strong> {hearing.attendance}</div>
                      <div><strong>What Transpired:</strong> {hearing.transpired}</div>
                      <div><strong>Minutes:</strong> {hearing.minutes}</div>
                      <div><strong>Recording:</strong> {hearing.recording ? hearing.recording.name : 'No recording uploaded'}</div>
                      <div><strong>Submitted by Parties:</strong> {hearing.submittedByParties}</div>
                      <div><strong>Final Decision:</strong> {hearing.finalDecision}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          <Dialog open={showHearingDialog} onOpenChange={setShowHearingDialog}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingHearing ? 'Edit Hearing' : 'Add New Hearing'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Type</Label>
                  <Select value={newHearing.type} onValueChange={(value) => setNewHearing({...newHearing, type: value as 'court' | 'deposition'})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="court">Court Hearing</SelectItem>
                      <SelectItem value="deposition">Deposition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date</Label>
                  <Input type="date" value={newHearing.date} onChange={(e) => setNewHearing({...newHearing, date: e.target.value})} />
                </div>
                <div>
                  <Label>Place</Label>
                  <Input value={newHearing.place} onChange={(e) => setNewHearing({...newHearing, place: e.target.value})} />
                </div>
                <div>
                  <Label>Time</Label>
                  <Input type="time" value={newHearing.time} onChange={(e) => setNewHearing({...newHearing, time: e.target.value})} />
                </div>
                <div>
                  <Label>Attendance</Label>
                  <Textarea value={newHearing.attendance} onChange={(e) => setNewHearing({...newHearing, attendance: e.target.value})} />
                </div>
                <div>
                  <Label>What Transpired</Label>
                  <Textarea value={newHearing.transpired} onChange={(e) => setNewHearing({...newHearing, transpired: e.target.value})} />
                </div>
                <div>
                  <Label>Minutes</Label>
                  <Textarea value={newHearing.minutes} onChange={(e) => setNewHearing({...newHearing, minutes: e.target.value})} />
                </div>
                <div>
                  <Label>Upload Recording</Label>
                  <Input type="file" onChange={(e) => setNewHearing({...newHearing, recording: e.target.files?.[0] || null})} />
                </div>
                <div>
                  <Label>Submitted by Parties</Label>
                  <Textarea value={newHearing.submittedByParties} onChange={(e) => setNewHearing({...newHearing, submittedByParties: e.target.value})} />
                </div>
                <div>
                  <Label>Final Decision</Label>
                  <Textarea value={newHearing.finalDecision} onChange={(e) => setNewHearing({...newHearing, finalDecision: e.target.value})} />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowHearingDialog(false)}>Cancel</Button>
                <Button onClick={() => {
                  if (editingHearing) {
                    setHearings(hearings.map(h => h.id === editingHearing.id ? {...newHearing, id: editingHearing.id} : h));
                  } else {
                    setHearings([...hearings, {...newHearing, id: Date.now().toString()}]);
                  }
                  setShowHearingDialog(false);
                  setNewHearing({type: "court", date: "", place: "", time: "", attendance: "", transpired: "", minutes: "", recording: null, submittedByParties: "", finalDecision: ""});
                }}>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="litigation-strategy">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Claimant's Talking Points and Evidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {litigationStrategy.claimant.talkingPoints.map(point => (
                  <div key={point.id} className="border rounded-lg p-4">
                    <p className="font-medium mb-2">{point.text}</p>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Evidence:</p>
                      <ul className="text-sm list-disc list-inside">
                        {point.evidence.map((ev, i) => {
                          const matchingDoc = documents.find(doc => ev.toLowerCase().includes(doc.name.toLowerCase()));
                          return (
                            <li key={i}>
                              {matchingDoc ? (
                                <button onClick={() => setActiveTab("documents")} className="text-primary hover:underline">
                                  {ev}
                                </button>
                              ) : (
                                ev
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Comments:</p>
                      {point.comments.map(comment => (
                        <div key={comment.id} className="text-sm border-l-2 border-muted pl-2 mt-1">
                          <p>{comment.text}</p>
                          <p className="text-xs text-muted-foreground">{comment.author} - {comment.date}</p>
                        </div>
                      ))}
                    </div>
                    {commentingOn === point.id ? (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleAddComment(point.id, 'claimant')}>Add Comment</Button>
                          <Button size="sm" variant="outline" onClick={() => { setCommentingOn(null); setNewComment(''); }}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setCommentingOn(point.id)}>Add Comment</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Defendant's Talking Points and Evidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {litigationStrategy.defendant.talkingPoints.map(point => (
                  <div key={point.id} className="border rounded-lg p-4">
                    <p className="font-medium mb-2">{point.text}</p>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Evidence:</p>
                      <ul className="text-sm list-disc list-inside">
                        {point.evidence.map((ev, i) => {
                          const matchingDoc = documents.find(doc => ev.toLowerCase().includes(doc.name.toLowerCase()));
                          return (
                            <li key={i}>
                              {matchingDoc ? (
                                <button onClick={() => setActiveTab("documents")} className="text-primary hover:underline">
                                  {ev}
                                </button>
                              ) : (
                                ev
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium">Comments:</p>
                      {point.comments.map(comment => (
                        <div key={comment.id} className="text-sm border-l-2 border-muted pl-2 mt-1">
                          <p>{comment.text}</p>
                          <p className="text-xs text-muted-foreground">{comment.author} - {comment.date}</p>
                        </div>
                      ))}
                    </div>
                    {commentingOn === point.id ? (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleAddComment(point.id, 'defendant')}>Add Comment</Button>
                          <Button size="sm" variant="outline" onClick={() => { setCommentingOn(null); setNewComment(''); }}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setCommentingOn(point.id)}>Add Comment</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Applicable Laws and Legal Precedents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lawsAndPrecedents.map(law => (
                  <div key={law.id} className="border rounded-lg p-4">
                    <p className="font-medium">{law.title}</p>
                    <p className="text-sm text-muted-foreground">{law.description}</p>
                    <p className="text-sm font-medium">Citation: {law.citation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timesheet">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Case Timesheet</CardTitle>
                <Button onClick={handleCreateInvoice} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Create Invoice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-foreground">
                      {timeEntries.filter(e => e.billable).reduce((sum, e) => sum + e.hours, 0).toFixed(1)}h
                    </p>
                    <p className="text-sm text-muted-foreground">Billable Hours</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-foreground">
                      ${timeEntries.filter(e => e.billable).reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Billable Amount</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-foreground">
                      {timeEntries.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Entries</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Timekeeper</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Billable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>{entry.description}</TableCell>
                        <TableCell>
                          <Link href={`/teams/${encodeURIComponent(entry.timekeeper)}`} className="text-primary hover:underline">
                            {entry.timekeeper}
                          </Link>
                        </TableCell>
                        <TableCell>{entry.hours}h</TableCell>
                        <TableCell>${entry.rate}/hr</TableCell>
                        <TableCell>${entry.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          {entry.billable ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Yes
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800">
                              No
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Note</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter your note here..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div key={note.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/teams/${encodeURIComponent(note.author)}`} className="font-medium text-primary hover:underline">
                          {note.author}
                        </Link>
                        <span className="text-xs text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="text-sm text-foreground">{note.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fees">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Case Fees</h2>
              <Button onClick={() => setShowFeeDialog(true)}>
                Add New Fee
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fee Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Total Fees</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${fees.reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Billable Fees</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${fees.filter(f => f.billable).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Unbilled Fees</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${fees.filter(f => f.billable && !f.invoiceId).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Fee Count</p>
                    <p className="text-2xl font-bold text-foreground">{fees.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Billable</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fees.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="capitalize">{fee.type}</TableCell>
                        <TableCell>{fee.description}</TableCell>
                        <TableCell>${fee.amount.toLocaleString()}</TableCell>
                        <TableCell>{fee.date}</TableCell>
                        <TableCell>{fee.billable ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          {fee.invoiceId ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Invoiced
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {fees.filter(f => f.billable && !f.invoiceId).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Add Unbilled Fees to Invoice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">
                      {fees.filter(f => f.billable && !f.invoiceId).length} unbilled fees totaling $
                      {fees.filter(f => f.billable && !f.invoiceId).reduce((sum, fee) => sum + fee.amount, 0).toLocaleString()}
                    </p>
                    <Button onClick={() => alert('Invoice integration feature - would open invoice selection dialog')}>
                      Add to Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
