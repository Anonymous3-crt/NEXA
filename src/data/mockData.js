import {
  FiMessageSquare, FiShield, FiUsers,
  FiCamera, FiFolder, FiMonitor,
  FiSlack, FiGitBranch, FiTerminal, FiCloud, FiDatabase, FiLock,
} from 'react-icons/fi';

export const features = [
  {
    icon: FiMessageSquare,
    title: 'AI Conversations',
    desc: 'Context-aware AI that understands nuance, remembers context, and delivers human-like responses in real-time.',
    gradient: 'from-indigo-400 to-purple-500',
    color: '#6366f1',
  },
  {
    icon: FiCamera,
    title: 'Voice & Video Calls',
    desc: 'Crystal-clear HD voice and video calls with AI-powered noise cancellation and adaptive bitrate.',
    gradient: 'from-purple-400 to-pink-500',
    color: '#a855f7',
  },
  {
    icon: FiShield,
    title: 'Secure Messaging',
    desc: 'End-to-end encrypted conversations with zero-knowledge architecture. Your privacy is our foundation.',
    gradient: 'from-cyan-400 to-blue-500',
    color: '#06b6d4',
  },
  {
    icon: FiUsers,
    title: 'Group Chats',
    desc: 'Create dynamic group conversations with threaded replies, mentions, and granular permission controls.',
    gradient: 'from-indigo-400 to-cyan-500',
    color: '#6366f1',
  },
  {
    icon: FiFolder,
    title: 'File Sharing',
    desc: 'Share files up to 2GB with instant preview, collaborative annotations, and version history.',
    gradient: 'from-purple-400 to-indigo-500',
    color: '#8b5cf6',
  },
  {
    icon: FiMonitor,
    title: 'Cross Platform',
    desc: 'Seamless experience across web, desktop, and mobile with real-time sync and offline support.',
    gradient: 'from-pink-400 to-purple-500',
    color: '#ec4899',
  },
];

export const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Designer at Stripe',
    initials: 'SC',
    content: 'Nexa has completely transformed how our team collaborates. The AI understands context better than any tool I have ever used.',
    rating: 5,
    color: '#6366f1',
  },
  {
    name: 'Marcus Rivera',
    role: 'Founder & CEO, TechFlow',
    initials: 'MR',
    content: 'We replaced three different tools with Nexa. The custom personas feature alone saves our engineers hours every day.',
    rating: 5,
    color: '#8b5cf6',
  },
  {
    name: 'Emily Nakamura',
    role: 'Lead Engineer, Vercel',
    initials: 'EN',
    content: 'The speed is incredible. Real-time responses with zero lag. This is what AI chat should feel like.',
    rating: 5,
    color: '#06b6d4',
  },
  {
    name: 'David Park',
    role: 'CTO, InnovateLab',
    initials: 'DP',
    content: 'Security was our biggest concern, and Nexa exceeded every requirement. Enterprise-grade encryption out of the box.',
    rating: 5,
    color: '#6366f1',
  },
];

export const howItWorks = [
  {
    step: 1,
    title: 'Create your account',
    desc: 'Sign up in seconds with your email or connect your existing workspace. No credit card required.',
    gradient: 'from-indigo-400 to-purple-500',
  },
  {
    step: 2,
    title: 'Connect with your team',
    desc: 'Invite teammates, set up channels, and customize your workspace exactly how you like it.',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    step: 3,
    title: 'Start chatting instantly',
    desc: 'Dive into intelligent conversations with AI-powered assistance, right out of the box.',
    gradient: 'from-cyan-400 to-blue-500',
  },
];

export const faqData = [
  {
    q: 'What makes Nexa different from other chat apps?',
    a: 'Nexa combines cutting-edge AI with a premium user experience. Our context-aware engine, custom personas, and enterprise-grade security set us apart from conventional chat applications.',
  },
  {
    q: 'Is my data secure and private?',
    a: 'Absolutely. We use end-to-end encryption for all messages and maintain a strict zero-data-retention policy. Your conversations are yours alone.',
  },
  {
    q: 'Can I use Nexa for team collaboration?',
    a: 'Yes! Nexa supports shared workspaces, real-time collaboration, and thread sharing. Perfect for teams of any size.',
  },
  {
    q: 'How many languages does Nexa support?',
    a: 'Nexa supports over 50 languages with automatic detection. Whether you are chatting in English, Japanese, Arabic, or Spanish, Nexa has you covered.',
  },
  {
    q: 'Is there a free tier available?',
    a: 'Yes, we offer a generous free tier with core features. Premium plans unlock advanced capabilities including custom personas, priority support, and team features.',
  },
];

export const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    features: ['1,000 messages/month', 'Basic AI chat', 'Single workspace', '24-hour message history'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    features: ['Unlimited messages', 'Advanced AI with custom personas', 'Unlimited workspaces', 'Full message history', 'Priority support'],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: '/month',
    features: ['Everything in Pro', 'Dedicated AI instance', 'SSO & SAML', 'Audit logs', '99.99% uptime SLA', 'Custom integrations'],
    cta: 'Contact Sales',
    featured: false,
  },
];

export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Pricing', href: '#pricing' },
];

export const companies = [
  { name: 'GitHub', symbol: 'GH' },
  { name: 'Vercel', symbol: 'VC' },
  { name: 'Figma', symbol: 'FG' },
  { name: 'Stripe', symbol: 'ST' },
  { name: 'Notion', symbol: 'NT' },
  { name: 'Linear', symbol: 'LN' },
];

export const integrations = [
  { icon: FiSlack, name: 'Slack', desc: 'Sync conversations and share threads directly to your channels.' },
  { icon: FiGitBranch, name: 'GitHub', desc: 'Connect repositories and get AI-powered code reviews.' },
  { icon: FiTerminal, name: 'VS Code', desc: 'Use Nexa directly inside your editor with our extension.' },
  { icon: FiCloud, name: 'AWS', desc: 'Deploy custom AI agents on your own infrastructure.' },
  { icon: FiDatabase, name: 'Supabase', desc: 'Store chat history and user data in your own database.' },
  { icon: FiLock, name: 'Okta', desc: 'Enterprise SSO with SCIM provisioning and directory sync.' },
];

export const currentUser = {
  id: 'me',
  name: 'Alex Rivera',
  email: 'alex@nexa.app',
  initials: 'AR',
  color: '#6366f1',
  status: 'online',
};

export const conversations = [
  { id: 'c1', name: 'Alice Chen', initials: 'AC', color: '#6366f1', lastMessage: 'Sure, I\'ll review the design system updates', time: '2m ago', online: true, unread: 2 },
  { id: 'c2', name: 'Design Team', initials: 'DT', color: '#8b5cf6', lastMessage: 'Sarah: New mockups are ready for review', time: '15m ago', online: true, unread: 0, group: true },
  { id: 'c3', name: 'Marcus Rivera', initials: 'MR', color: '#06b6d4', lastMessage: 'Thanks for the feedback! I\'ll iterate on it', time: '1h ago', online: true, unread: 1 },
  { id: 'c4', name: 'Emily Nakamura', initials: 'EN', color: '#ec4899', lastMessage: 'Meeting at 3pm to discuss Q4 roadmap', time: '2h ago', online: false, unread: 0 },
  { id: 'c5', name: 'David Park', initials: 'DP', color: '#f59e0b', lastMessage: 'Deployed to staging. Can you verify?', time: '3h ago', online: true, unread: 0 },
  { id: 'c6', name: 'Nexa AI Assistant', initials: 'AI', color: '#10b981', lastMessage: 'I\'ve summarized your unread messages', time: '5h ago', online: true, unread: 3, ai: true },
  { id: 'c7', name: 'Sarah Williams', initials: 'SW', color: '#6366f1', lastMessage: 'Love the new dark mode!', time: '1d ago', online: false, unread: 0 },
  { id: 'c8', name: 'Product Team', initials: 'PT', color: '#8b5cf6', lastMessage: 'Alex: Updated the sprint board', time: '1d ago', online: true, unread: 0, group: true },
];

export const messages = {
  c1: [
    { id: 'm1', sender: 'contact', text: 'Hey! How are the designs coming along?', time: '10:32 AM' },
    { id: 'm2', sender: 'user', text: 'Going well! Just finished the dashboard mockups for the new chat feature.', time: '10:33 AM' },
    { id: 'm3', sender: 'contact', text: 'That\'s great! Can I take a look?', time: '10:34 AM' },
    { id: 'm4', sender: 'user', text: 'Sure! I\'ll share the Figma link with you in a bit. Still polishing some of the animations.', time: '10:35 AM' },
    { id: 'm5', sender: 'contact', text: 'No rush! Take your time. The previews you showed in the standup looked amazing btw ✨', time: '10:36 AM' },
    { id: 'm6', sender: 'user', text: 'Thank you! Really happy with how the glassmorphism turned out. Thinking of adding some micro-interactions to the sidebar.', time: '10:38 AM' },
    { id: 'm7', sender: 'contact', text: 'That would be perfect! The sidebar definitely needs some love. Let me know if you need any help with the animations.', time: '10:40 AM' },
    { id: 'm8', sender: 'contact', text: 'Sure, I\'ll review the design system updates', time: '10:42 AM' },
  ],
  c2: [
    { id: 'm9', sender: 'contact', text: 'Sarah: New mockups are ready for review', time: '11:00 AM' },
    { id: 'm10', sender: 'contact', text: 'Great work Sarah! The new onboarding flow looks clean.', time: '11:05 AM', senderName: 'Marcus' },
    { id: 'm11', sender: 'user', text: 'Agreed! The loading states are a nice touch. Let me pull the latest Figma file.', time: '11:07 AM' },
  ],
  c3: [
    { id: 'm12', sender: 'contact', text: 'Hey Alex, I pushed the new API endpoints for the chat feature.', time: '9:00 AM' },
    { id: 'm13', sender: 'user', text: 'Awesome! Let me test them out. What\'s the base URL?', time: '9:02 AM' },
    { id: 'm14', sender: 'contact', text: 'It\'s /api/v2/chat. Added the pagination support you requested.', time: '9:05 AM' },
    { id: 'm15', sender: 'user', text: 'Perfect. I\'ll integrate it this afternoon and let you know if I run into any issues.', time: '9:10 AM' },
    { id: 'm16', sender: 'contact', text: 'Thanks for the feedback! I\'ll iterate on it', time: '9:15 AM' },
  ],
  c4: [
    { id: 'm17', sender: 'contact', text: 'Meeting at 3pm to discuss Q4 roadmap', time: '1:00 PM' },
    { id: 'm18', sender: 'user', text: 'Got it! I\'ll prepare the metrics deck.', time: '1:05 PM' },
    { id: 'm19', sender: 'contact', text: 'Perfect, see you there!', time: '1:06 PM' },
  ],
  c5: [
    { id: 'm20', sender: 'contact', text: 'Deployed to staging. Can you verify?', time: '2:00 PM' },
    { id: 'm21', sender: 'user', text: 'On it! Give me 10 minutes to run through the test cases.', time: '2:03 PM' },
    { id: 'm22', sender: 'contact', text: 'No rush. Everything passed CI/CD.', time: '2:05 PM' },
  ],
  c6: [
    { id: 'm23', sender: 'ai', text: 'Good morning! You have 3 unread messages from 2 conversations.', time: '8:00 AM' },
    { id: 'm24', sender: 'ai', text: 'Alice Chen: "Let me know when the designs are ready"', time: '8:00 AM' },
    { id: 'm25', sender: 'ai', text: 'Your next meeting "Design Review" starts in 2 hours.', time: '8:00 AM' },
    { id: 'm26', sender: 'user', text: 'Thanks, can you draft a reply to Alice?', time: '8:05 AM' },
    { id: 'm27', sender: 'ai', text: 'Sure! How about: "Hey Alice! The designs are almost ready. I\'ll share them with you by EOD. 🎨"', time: '8:05 AM' },
  ],
  c7: [
    { id: 'm28', sender: 'contact', text: 'Love the new dark mode!', time: '6:00 PM' },
    { id: 'm29', sender: 'user', text: 'Thanks Sarah! It took a while to get the contrast right but I\'m happy with the result.', time: '6:05 PM' },
  ],
  c8: [
    { id: 'm30', sender: 'contact', text: 'Alex: Updated the sprint board with the new tasks', time: '4:00 PM', senderName: 'Alex' },
    { id: 'm31', sender: 'contact', text: 'Nice! I\'ll update the estimates today.', time: '4:05 PM', senderName: 'Emma' },
    { id: 'm32', sender: 'contact', text: 'Can we push the review to Thursday? Need more time for QA.', time: '4:10 PM', senderName: 'David' },
  ],
};

export const notifications = [
  { id: 'n1', title: 'Alice mentioned you', desc: 'in Design Team: "Alex can you review the mockups?"', time: '2m ago', icon: '💬', read: false },
  { id: 'n2', title: 'New file shared', desc: 'Marcus uploaded "Q4_metrics_v2.xlsx"', time: '15m ago', icon: '📄', read: false },
  { id: 'n3', title: 'Meeting reminder', desc: 'Design Review in 30 minutes', time: '25m ago', icon: '📅', read: false },
  { id: 'n4', title: 'Deployment successful', desc: 'Frontend v2.4.1 deployed to production', time: '1h ago', icon: '🚀', read: true },
  { id: 'n5', title: 'New team member', desc: 'Jordan Lee joined the Product Team', time: '2h ago', icon: '👋', read: true },
  { id: 'n6', title: 'Voice message received', desc: 'Alice sent a voice message (0:32)', time: '3h ago', icon: '🎤', read: true },
  { id: 'n7', title: 'Calendar updated', desc: 'Design Review moved to Thursday 2pm', time: '5h ago', icon: '📅', read: true },
  { id: 'n8', title: 'System update', desc: 'Nexa v2.5.0 will be deployed tonight at 2AM', time: '1d ago', icon: '🔄', read: true },
];

export const archivedChats = [
  { id: 'a1', name: 'Old Project Team', initials: 'OP', color: '#6366f1', lastMessage: 'Final build deployed to production', time: '2 weeks ago', members: 6 },
  { id: 'a2', name: 'Marketing Q2', initials: 'MQ', color: '#8b5cf6', lastMessage: 'Campaign results are in! Great quarter.', time: '1 month ago', members: 4 },
  { id: 'a3', name: 'Sprint 12 Retro', initials: 'SR', color: '#06b6d4', lastMessage: 'Action items added to the board', time: '1 month ago', members: 8 },
  { id: 'a4', name: 'Design System Sync', initials: 'DS', color: '#ec4899', lastMessage: 'Component library v2 published', time: '2 months ago', members: 3 },
];

export const starredMessages = [
  { id: 's1', from: 'Alice Chen', text: 'This design is absolutely stunning! The team loved it 🎨', chat: 'Design Team', time: '2 days ago', color: '#6366f1' },
  { id: 's2', from: 'Marcus Rivera', text: 'Deploying to production now. Everything looks solid.', chat: 'Marcus Rivera', time: '5 days ago', color: '#06b6d4' },
  { id: 's3', from: 'Emily Nakamura', text: 'Q4 targets: +40% revenue, 3 new enterprise clients', chat: 'Emily Nakamura', time: '1 week ago', color: '#ec4899' },
  { id: 's4', from: 'Nexa AI', text: 'I\'ve analyzed your team\'s productivity patterns. Here are some insights...', chat: 'Nexa AI Assistant', time: '1 week ago', color: '#10b981' },
  { id: 's5', from: 'David Park', text: 'Security audit passed with 100% score. No vulnerabilities found.', chat: 'David Park', time: '2 weeks ago', color: '#f59e0b' },
  { id: 's6', from: 'Sarah Williams', text: 'The new onboarding flow reduced drop-off by 60%! 🚀', chat: 'Sarah Williams', time: '2 weeks ago', color: '#6366f1' },
];

export const mediaItems = [
  { id: 'm1', name: 'dashboard_mockup.png', type: 'image', size: '2.4 MB', from: 'Alice Chen', time: '2h ago', preview: '🖼️' },
  { id: 'm2', name: 'presentation_q4.pdf', type: 'document', size: '4.1 MB', from: 'Emily Nakamura', time: '5h ago', preview: '📄' },
  { id: 'm3', name: 'team_photo_2026.jpg', type: 'image', size: '3.2 MB', from: 'Marcus Rivera', time: '1d ago', preview: '📸' },
  { id: 'm4', name: 'sprint_demo_recording.mp4', type: 'video', size: '45 MB', from: 'David Park', time: '2d ago', preview: '🎬' },
  { id: 'm5', name: 'brand_guidelines_v3.fig', type: 'figma', size: '12 MB', from: 'Sarah Williams', time: '3d ago', preview: '🎨' },
  { id: 'm6', name: 'meeting_notes_march.md', type: 'document', size: '28 KB', from: 'Alice Chen', time: '4d ago', preview: '📝' },
  { id: 'm7', name: 'product_screenshot.png', type: 'image', size: '1.8 MB', from: 'Nexa AI', time: '5d ago', preview: '🖼️' },
  { id: 'm8', name: 'team_intro_video.mp4', type: 'video', size: '32 MB', from: 'HR Team', time: '1w ago', preview: '🎬' },
  { id: 'm9', name: 'icon_set_2026.zip', type: 'archive', size: '8.5 MB', from: 'Design Team', time: '1w ago', preview: '📦' },
  { id: 'm10', name: 'q1_report.pdf', type: 'document', size: '6.2 MB', from: 'Emily Nakamura', time: '2w ago', preview: '📄' },
  { id: 'm11', name: 'wallpaper_dark.png', type: 'image', size: '5.1 MB', from: 'Alice Chen', time: '2w ago', preview: '🌅' },
  { id: 'm12', name: 'code_review_snippet.png', type: 'image', size: '856 KB', from: 'Marcus Rivera', time: '3w ago', preview: '💻' },
];

export const callLogs = [
  { id: 'cl1', name: 'Alice Chen', initials: 'AC', color: '#6366f1', type: 'incoming', status: 'completed', duration: '12:34', time: '2h ago', missed: false },
  { id: 'cl2', name: 'Design Team', initials: 'DT', color: '#8b5cf6', type: 'outgoing', status: 'completed', duration: '45:20', time: '5h ago', missed: false, group: true },
  { id: 'cl3', name: 'Marcus Rivera', initials: 'MR', color: '#06b6d4', type: 'incoming', status: 'missed', duration: null, time: '1d ago', missed: true },
  { id: 'cl4', name: 'Emily Nakamura', initials: 'EN', color: '#ec4899', type: 'outgoing', status: 'completed', duration: '8:15', time: '2d ago', missed: false },
  { id: 'cl5', name: 'David Park', initials: 'DP', color: '#f59e0b', type: 'incoming', status: 'completed', duration: '22:40', time: '3d ago', missed: false },
  { id: 'cl6', name: 'Sarah Williams', initials: 'SW', color: '#6366f1', type: 'video', status: 'completed', duration: '35:10', time: '4d ago', missed: false },
  { id: 'cl7', name: 'Product Team', initials: 'PT', color: '#8b5cf6', type: 'video', status: 'missed', duration: null, time: '5d ago', missed: true, group: true },
  { id: 'cl8', name: 'Nexa AI', initials: 'AI', color: '#10b981', type: 'incoming', status: 'completed', duration: '5:22', time: '1w ago', missed: false, ai: true },
];

export const contacts = [
  { id: 'ct1', name: 'Alice Chen', initials: 'AC', color: '#6366f1', status: 'online', email: 'alice@example.com', role: 'Product Designer', mutual: 3 },
  { id: 'ct2', name: 'Marcus Rivera', initials: 'MR', color: '#06b6d4', status: 'online', email: 'marcus@example.com', role: 'Full Stack Developer', mutual: 5 },
  { id: 'ct3', name: 'Emily Nakamura', initials: 'EN', color: '#ec4899', status: 'away', email: 'emily@example.com', role: 'Product Manager', mutual: 2 },
  { id: 'ct4', name: 'David Park', initials: 'DP', color: '#f59e0b', status: 'online', email: 'david@example.com', role: 'DevOps Engineer', mutual: 4 },
  { id: 'ct5', name: 'Sarah Williams', initials: 'SW', color: '#6366f1', status: 'offline', email: 'sarah@example.com', role: 'UX Researcher', mutual: 1 },
  { id: 'ct6', name: 'Jordan Lee', initials: 'JL', color: '#8b5cf6', status: 'online', email: 'jordan@example.com', role: 'Frontend Developer', mutual: 2 },
  { id: 'ct7', name: 'Taylor Kim', initials: 'TK', color: '#06b6d4', status: 'away', email: 'taylor@example.com', role: 'Backend Developer', mutual: 3 },
  { id: 'ct8', name: 'Morgan Patel', initials: 'MP', color: '#ec4899', status: 'offline', email: 'morgan@example.com', role: 'Data Scientist', mutual: 0 },
  { id: 'ct9', name: 'Casey Johnson', initials: 'CJ', color: '#f59e0b', status: 'online', email: 'casey@example.com', role: 'Marketing Lead', mutual: 1 },
  { id: 'ct10', name: 'Riley Thompson', initials: 'RT', color: '#6366f1', status: 'offline', email: 'riley@example.com', role: 'Content Writer', mutual: 2 },
];

export const helpArticles = [
  { id: 'h1', category: 'Getting Started', title: 'How to create your Nexa account', desc: 'Learn how to sign up and set up your profile in minutes.', icon: '🚀', readTime: '3 min' },
  { id: 'h2', category: 'Getting Started', title: 'Navigating the dashboard', desc: 'A tour of the Nexa interface and where to find everything.', icon: '🧭', readTime: '5 min' },
  { id: 'h3', category: 'Messages', title: 'Sending messages and files', desc: 'How to send text, images, documents, and more.', icon: '💬', readTime: '4 min' },
  { id: 'h4', category: 'Messages', title: 'Using AI-powered suggestions', desc: 'Let Nexa AI help you draft better responses.', icon: '🤖', readTime: '6 min' },
  { id: 'h5', category: 'Calls', title: 'Making voice and video calls', desc: 'Start high-quality calls with anyone on Nexa.', icon: '📞', readTime: '4 min' },
  { id: 'h6', category: 'Calls', title: 'Screen sharing and presentations', desc: 'Share your screen during calls for better collaboration.', icon: '🖥️', readTime: '3 min' },
  { id: 'h7', category: 'Settings', title: 'Managing notifications', desc: 'Customize which alerts you receive and how.', icon: '🔔', readTime: '5 min' },
  { id: 'h8', category: 'Settings', title: 'Privacy and security settings', desc: 'Control your data, encryption, and account security.', icon: '🔒', readTime: '7 min' },
  { id: 'h9', category: 'Account', title: 'Updating your profile', desc: 'Change your name, photo, and account preferences.', icon: '👤', readTime: '3 min' },
  { id: 'h10', category: 'Account', title: 'Managing workspace settings', desc: 'Configure your team workspace and member permissions.', icon: '⚙️', readTime: '6 min' },
];

export const helpCategories = ['Getting Started', 'Messages', 'Calls', 'Settings', 'Account'];