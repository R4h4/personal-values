<script lang="ts">
  import { twMerge } from 'tailwind-merge';
  import Button from '$lib/components/ui/button/button.svelte';
  import ImportanceSorter from './ImportanceSorter.svelte';
  import HeaderSection from '$lib/components/HeaderSection.svelte';

  let personalValues = [
    { id: 1, name: 'Acceptance', description: 'to be accepted as I am', importance: null },
    {
      id: 2,
      name: 'Accuracy',
      description: 'to be accurate in my opinions and beliefs',
      importance: null
    },
    {
      id: 3,
      name: 'Achievement',
      description: 'to have important accomplishments',
      importance: null
    },
    {
      id: 4,
      name: 'Adventure',
      description: 'to have new and exciting experiences',
      importance: null
    },
    { id: 5, name: 'Attractiveness', description: 'to be physically attractive', importance: null },
    {
      id: 6,
      name: 'Authority',
      description: 'to be in charge of and responsible for others',
      importance: null
    },
    {
      id: 7,
      name: 'Autonomy',
      description: 'to be self-determined and independent',
      importance: null
    },
    { id: 8, name: 'Beauty', description: 'to appreciate beauty around me', importance: null },
    { id: 9, name: 'Caring', description: 'to take care of others', importance: null },
    {
      id: 10,
      name: 'Challenge',
      description: 'to take on difficult tasks and problems',
      importance: null
    },
    {
      id: 11,
      name: 'Change',
      description: 'to have a life full of change and variety',
      importance: null
    },
    {
      id: 12,
      name: 'Comfort',
      description: 'to have a pleasant and comfortable life',
      importance: null
    },
    {"id": 13, "name": "Commitment", "description": "to make enduring, meaningful commitments", "importance": null},
    {"id": 14, "name": "Compassion", "description": "to feel and act on concern for others", "importance": null},
    {"id": 15, "name": "Contribution", "description": "to make a lasting contribution to the world", "importance": null},
    {"id": 16, "name": "Cooperation", "description": "to work collaboratively with others", "importance": null},
    {"id": 17, "name": "Courtesy", "description": "to be considerate and polite toward others", "importance": null},
    {"id": 18, "name": "Creativity", "description": "to have new and original ideas", "importance": null},
    {"id": 19, "name": "Dependability", "description": "to be reliable and trustworthy", "importance": null},
    {"id": 20, "name": "Duty", "description": "to carry out my duties and obligations", "importance": null},
    {"id": 21, "name": "Ecology", "description": "to live in harmony with the environment", "importance": null},
    {"id": 22, "name": "Excitement", "description": "to have a life full of thrills and stimulation", "importance": null},
    {"id": 23, "name": "Faithfulness", "description": "to be loyal and true in relationships", "importance": null},
    {"id": 24, "name": "Fame", "description": "to be known and recognized", "importance": null},
    {"id": 25, "name": "Family", "description": "to have a happy, loving family", "importance": null},
    {"id": 26, "name": "Fitness", "description": "to be physically fit and strong", "importance": null},
    {"id": 27, "name": "Flexibility", "description": "to adjust to new circumstances easily", "importance": null},
    {"id": 28, "name": "Forgiveness", "description": "to be forgiving of others", "importance": null},
    {"id": 29, "name": "Friendship", "description": "to have close, supportive friends", "importance": null},
    {"id": 30, "name": "Fun", "description": "to play and have fun", "importance": null},
    {"id": 31, "name": "Generosity", "description": "to give what I have to others", "importance": null},
    {"id": 32, "name": "Genuineness", "description": "to act in a manner that is true to who I am", "importance": null},
    {"id": 33, "name": "Growth", "description": "to keep changing and growing", "importance": null},
    {"id": 34, "name": "Health", "description": "to have good health and well-being", "importance": null},
    {"id": 35, "name": "Helpfulness", "description": "to be helpful to others", "importance": null},
    {"id": 36, "name": "Honesty", "description": "to be honest and truthful", "importance": null},
    {"id": 37, "name": "Hope", "description": "to maintain a positive and optimistic outlook", "importance": null},
    {"id": 38, "name": "Humility", "description": "to be modest and unassuming", "importance": null},
    {"id": 39, "name": "Humor", "description": "to see the humorous side of myself and the world", "importance": null},
    {"id": 40, "name": "Independence", "description": "to be free from dependence on others", "importance": null},
    {"id": 41, "name": "Industry", "description": "to work hard and well at my life tasks", "importance": null},
    {"id": 42, "name": "Inner Peace", "description": "to experience personal peace", "importance": null},
    {"id": 43, "name": "Intimacy", "description": "to share my innermost experiences with others", "importance": null},
    {"id": 44, "name": "Justice", "description": "to promote fair and equal treatment for all", "importance": null},
    {"id": 45, "name": "Knowledge", "description": "to learn and contribute valuable knowledge", "importance": null},
    {"id": 46, "name": "Leisure", "description": "to take time to relax and enjoy", "importance": null},
    {"id": 47, "name": "Loved", "description": "to be loved by those close to me", "importance": null},
    {"id": 48, "name": "Loving", "description": "to give love to others", "importance": null},
    {"id": 49, "name": "Mastery", "description": "to be competent in my everyday activities", "importance": null},
    {"id": 50, "name": "Mindfulness", "description": "to live consciously and mindful of the present moment", "importance": null},
    {"id": 51, "name": "Moderation", "description": "to avoid excesses and find a middle ground", "importance": null},
    {"id": 52, "name": "Monogamy", "description": "to have one close, loving relationship", "importance": null},
    {"id": 53, "name": "Non-Conformity", "description": "to question and challenge authority and norms", "importance": null},
    {"id": 54, "name": "Nurturance", "description": "to take care of and nurture others", "importance": null},
    {"id": 55, "name": "Openness", "description": "to be open to new experiences, ideas, and options", "importance": null},
    {"id": 56, "name": "Order", "description": "to have a life that is well-ordered and organized", "importance": null},
    {"id": 57, "name": "Passion", "description": "to have deep feelings about ideas, activities, or people", "importance": null},
    {"id": 58, "name": "Pleasure", "description": "to feel good", "importance": null},
    {"id": 59, "name": "Popularity", "description": "to be well-liked by many people", "importance": null},
    {"id": 60, "name": "Power", "description": "to have control over others", "importance": null},
    {"id": 61, "name": "Purpose", "description": "to have meaning and direction in my life", "importance": null},
    {"id": 62, "name": "Rationality", "description": "to be guided by reason and logic", "importance": null},
    {"id": 63, "name": "Realism", "description": "to see and act realistically and practically", "importance": null},
    {"id": 64, "name": "Religion", "description": "to be connected to a higher power through beliefs and practices", "importance": null},
    {"id": 65, "name": "Responsibility", "description": "to make and carry out responsible decisions", "importance": null},
    {"id": 66, "name": "Risk", "description": "to take risks and chances", "importance": null},
    {"id": 67, "name": "Romance", "description": "to have intense, exciting love in my life", "importance": null},
    {"id": 68, "name": "Safety", "description": "to be safe and secure", "importance": null},
    {"id": 69, "name": "Self-Acceptance", "description": "to accept myself as I am", "importance": null},
    {"id": 70, "name": "Self-Control", "description": "to be disciplined in my own actions", "importance": null},
    {"id": 71, "name": "Self-Esteem", "description": "to feel good about myself", "importance": null},
    {"id": 72, "name": "Self-Knowledge", "description": "to have a deep and honest understanding of myself", "importance": null},
    {"id": 73, "name": "Service", "description": "to be of service to others", "importance": null},
    {"id": 74, "name": "Sexuality", "description": "to have an active and satisfying sex life", "importance": null},
    {"id": 75, "name": "Simplicity", "description": "to live life simply, with minimal needs", "importance": null},
    {"id": 76, "name": "Solitude", "description": "to have time and space where I can be apart from others", "importance": null},
    {"id": 77, "name": "Spirituality", "description": "to grow and mature spiritually", "importance": null},
    {"id": 78, "name": "Stability", "description": "to have a life that stays fairly consistent", "importance": null},
    {"id": 79, "name": "Tolerance", "description": "to accept and respect those who are different from me", "importance": null},
    {"id": 80, "name": "Tradition", "description": "to follow respected patterns of the past", "importance": null},
    {"id": 81, "name": "Virtue", "description": "to live a morally pure and excellent life", "importance": null},
    {"id": 82, "name": "Wealth", "description": "to have an abundance of money", "importance": null},
    {"id": 83, "name": "World Peace", "description": "to work to promote peace in the world", "importance": null},
    {"id": 84, "name": "Curiosity", "description": "to explore, learn, and satisfy intellectual interests", "importance": null}
  ];

  function shuffleArray<T>(array: T[]): T[] {
    // Create a copy of the original array to avoid modifying it directly
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at i and j
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  let shuffledValues = shuffleArray(personalValues);

  let allValuesVoted = $state(false);
</script>

<div class="flex flex-col h-dvh">
  <div id="Nav" class="flex w-full justify-between h-14 mt-2 mb-4">
    <Button variant="link" href="/values" class="mr-4 h-14 invisible inactive">Back</Button>
  </div>

  <div class="flex flex-col flex-1 overflow-hidden">
    <HeaderSection 
      title="Find your core values." 
      subTitle="Click on the buttons below to sort the values based on their importance to you." 
    />

    <div class="flex-1 overflow-auto">
      <ImportanceSorter items={shuffledValues} bind:allValuesVoted />
    </div>

    <div class='w-full p-6 pt-2'>
      <Button
        variant="default"
        class={twMerge(
          'w-full text-white',
          allValuesVoted ? 'bg-primary' : 'bg-primary/30 pointer-events-none'
        )}
        href="/values/most"
      >
        Continue
      </Button>
    </div>
  </div>
</div>
