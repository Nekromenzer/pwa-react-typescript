export interface IExercise {
    id: string;
    title: string;
    isNotSynced?: boolean;
    isDone: boolean;
  }
  
  export interface UpdateExercisePayload {
    id: string;
    isDone: boolean;
  }
  
  let exercises: IExercise[] = [
    {
      id: '1',
      title: 'Push ups',
      isDone: true,
    },
    {
      id: '2',
      title: 'Pull ups',
      isDone: false,
    },
    {
      id: '3',
      title: 'Squats',
      isDone: false,
    },
    {
      id: '4',
      title: 'Lunges',
      isDone: false,
    },
    {
      id: '5',
      title: 'Bench press',
      isDone: false,
    },
  ];
  
  export const fakeApi = {
    getTodos: () =>
      new Promise<IExercise[]>(resolve => {
        setTimeout(() => resolve(exercises), 300);
      }),
    updateExerciseStatus: (id: string, isDone: boolean) =>
      new Promise<IExercise>(resolve => {
        setTimeout(() => {
          const exerciseToUpdate = exercises.find(t => t.id === id);
  
          if (exerciseToUpdate) {
            const updatedExercise = {
              ...exerciseToUpdate,
              isDone,
            };
  
            exercises = exercises.map(exercise => {
              if (exercise.id === id) {
                return updatedExercise;
              }
              return exercise;
            });
  
            resolve(updatedExercise);
          }
        }, 300);
      }),
  };