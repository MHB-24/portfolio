import { ASSETS } from '../assets';
import styles from './Experience.module.css';

const JOBS = [
  {
    role: 'Associate UX Designer',
    type: 'Full-time',
    duration: 'Jul 2024 – Present',
    extra: null,
  },
  {
    role: 'Associate UX Designer',
    type: 'Student Job',
    duration: 'Jan 2023 – Jul 2024',
    extra: '1 yr 7 mos',
  },
  {
    role: 'Intern UX Designer',
    type: 'Internship',
    duration: 'Oct 2022 – Dec 2022',
    extra: '3 mos',
  },
];

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <h2 className={styles.title}>Experience</h2>

      {/* Company */}
      <div className={styles.company}>
        <img
          className={styles.logo}
          src={ASSETS.bytecorpLogo}
          alt="ByteCorp logo"
        />
        <div>
          <div className={styles.companyName}>ByteCorp</div>
          <div className={styles.companyDur}>3+ yrs</div>
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        <div className={styles.stepCol}>
          <img
            src={ASSETS.stepLine1}
            alt=""
            style={{ width: 13, height: 154, objectFit: 'contain' }}
          />
          <img
            src={ASSETS.stepLine2}
            alt=""
            style={{ width: 13, height: 144, objectFit: 'contain' }}
          />
        </div>
        <div className={styles.expList}>
          {JOBS.map((job, i) => (
            <div key={i} className={styles.expItem}>
              <div className={styles.role}>{job.role}</div>
              <div className={styles.type}>{job.type}</div>
              <div className={styles.dur}>
                {job.duration}
                {job.extra && (
                  <>
                    <span className={styles.dot} />
                    {job.extra}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design process */}
      <div className={styles.processLabel}>My design process</div>
      <img
        className={styles.processImg}
        src={ASSETS.designProcess}
        alt="Design process diagram"
      />
    </section>
  );
}
