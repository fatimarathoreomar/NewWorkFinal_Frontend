import { atom } from 'jotai';

// User state
export const userAtom = atom({
  _id:'',
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  type: 0,
  createdAt: '',
});

// Freelancer state
export const freelancerAtom = atom({
  _id:'',
  user_id: '',
  myImage: '',
  bio: '',
  skills: [],
  projects: [],
  rating: 0,
  hourlyRate: 0,
});

// Recruiter state
export const recruiterAtom = atom({
  _id:'',
  user_id: '',
  company: '',
  bio: '',
  jobs: [],
  
});

import { selector } from 'jotai';

// User selectors
export const userIdSelector = selector((get) => get(userAtom)._id);
export const usernameSelector = selector((get) => get(userAtom).username);
export const emailSelector = selector((get) => get(userAtom).email);

// Freelancer selectors
export const freelancerIdSelector = selector((get) => get(freelancerAtom)._id);
export const freelancerSkillsSelector = selector((get) => get(freelancerAtom).skills);
export const freelancerProjectsSelector = selector((get) => get(freelancerAtom).projects);

// Recruiter selectors
export const recruiterIdSelector = selector((get) => get(recruiterAtom)._id);
export const recruiterCompanySelector = selector((get) => get(recruiterAtom).company);
export const recruiterJobsSelector = selector((get) => get(recruiterAtom).jobs);
export const recruiterbioSelector = selector((get) => get(recruiterAtom).bio);
export const recruiteruserIdSelector = selector((get) => get(recruiterAtom).user_id);