import React from "react";
import { motion } from "framer-motion";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { skillData } from "../../data/skillData";
import { projectList } from "../../data/projectData";

function Skills() {
  // Map skills to projects for tooltip context
  const usedInMap = {
    'React (JavaScript & TypeScript)': ['🌦️ Weather Pro', '🧵 Parallel Computing Hub', '🧮 Basic Calculator'],
    'Spring Boot': ['🧮 Basic Calculator', '🔢 ProCalc', '🎅 Secret Santa'],
    'Tailwind CSS': ['🌦️ Weather Pro'],
    'Flutter': ['💬 Chat App'],
    'Bootstrap 5': ['🎅 Secret Santa', '🔢 ProCalc'],
    'Maven': ['🧮 Basic Calculator', '🔢 ProCalc'],
    'Vite': ['🌦️ Weather Pro', '🧵 Parallel Computing Hub'],
    'Firebase': ['💬 Chat App'],
    'MySQL': ['🎅 Secret Santa'],
  };

  const levelToPercent = (level) => {
    switch ((level || '').toLowerCase()) {
      case 'advanced':
        return 85;
      case 'intermediate':
        return 65;
      case 'beginner':
      case 'basic':
        return 40;
      default:
        return 0;
    }
  };

  // Build a quick lookup for project titles (guard if undefined)
  const projectTitles = new Set((Array.isArray(projectList) ? projectList : []).map(p => p && p.title).filter(Boolean));

  const getTooltipContent = (skill) => {
    const name = skill.name;
    const usedArr = Array.isArray(usedInMap[name]) ? usedInMap[name] : [];
    const used = usedArr.filter(t => projectTitles.has(t));
    const parts = [name];
    if (skill.desc) parts.push(`— ${skill.desc}`);
    if (used && used.length) parts.push(`Used in: ${used.join(', ')}`);
    return parts.join('  |  ');
  };

  // Toggle this to true for monochrome icons sitewide
  const monochrome = false;

  const levelBadgeStyles = (level) => {
    switch ((level || '').toLowerCase()) {
      case 'advanced':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-500/30';
      case 'intermediate':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 border-amber-200/60 dark:border-amber-500/30';
      case 'beginner':
      case 'basic':
        return 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 border-sky-200/60 dark:border-sky-500/30';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300 border-gray-200/60 dark:border-white/15';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const pillVariants = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  return (
    <section id="skills" className="pt-20 px-6 bg-white text-gray-900 dark:bg-gradient-to-r dark:from-black dark:to-gray-900 dark:text-white">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-5xl mx-auto"
      >
        <motion.h2 className="text-3xl font-bold mb-8 text-center text-blue-400" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, ease: 'easeOut' }}>
          My Tech Stack
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(Array.isArray(skillData) ? skillData : []).map((category, i) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-white/10 p-5 shadow-sm"
            >
              <motion.div
                className="h-1.5 w-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full mb-4"
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ transformOrigin: 'left center' }}
              />
              <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {(Array.isArray(category.skills) ? category.skills : []).map((s, idx) => (
                  <motion.div
                    key={s.name + idx}
                    className="flex flex-col rounded-md bg-gray-200 dark:bg-white/10 border border-gray-300/60 dark:border-white/10 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 shadow-sm hover:shadow transition-transform duration-150 hover:-translate-y-0.5 w-fit min-w-[8rem]"
                    data-tooltip-id="skills-tooltip"
                    data-tooltip-content={getTooltipContent(s)}
                    variants={pillVariants}
                    whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(34,211,238,0.15)' }}
                  >
                    <div className="inline-flex items-center gap-2">
                      {s.icon ? (
                        <img src={s.icon} alt={s.name} className={`h-4 w-4 object-contain ${monochrome ? 'filter grayscale contrast-125 opacity-90' : ''}`} />
                      ) : (
                        <span className="h-4 w-4 inline-flex items-center justify-center text-xs">🌐</span>
                      )}
                      <span>{s.name}</span>
                    </div>
                    {s.level && (
                      <div className="mt-1 h-1.5 w-full rounded-full bg-gray-300/70 dark:bg-white/10 overflow-hidden border border-gray-300/60 dark:border-white/10">
                        <motion.div
                          className={`h-full rounded-full ${s.level ? levelBadgeStyles(s.level) : 'bg-cyan-400'}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${levelToPercent(s.level)}%` }}
                          viewport={{ once: false }}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                          aria-hidden
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <Tooltip id="skills-tooltip" className="!text-xs" />
      </motion.div>
    </section>
  );
}

export default Skills;
