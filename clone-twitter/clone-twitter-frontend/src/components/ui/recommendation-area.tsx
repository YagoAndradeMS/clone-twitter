'use client';
import { useFollowing } from '../../hooks/useFollowing';
import {
  RecommendationItem,
  RecommendationItemSkeleton,
} from './recommendation-item';

export const RecommendationArea = () => {
  const user = useFollowing();
  return (
    <div className='bg-gray-700 rounded-3xl'>
      <h2 className='text-xl pt-6 px-6 pb-3'>Quem seguir</h2>
      <div className='flex flex-col gap-4 p-6 pt-0'>
        {user ? (
          user?.length > 0 ? (
            <div className='flex flex-col gap-3'>
              {user.map(user => (
                <RecommendationItem user={user} key={user.slug} />
              ))}
            </div>
          ) : (
            ''
          )
        ) : (
          <RecommendationItemSkeleton />
        )}
      </div>
    </div>
  );
};

// suggestions
// export const RecommendationArea = () => {
//   const user = useUsers();
//   return (
//     <div className='bg-gray-700 rounded-3xl'>
//       <h2 className='text-xl p-6'>Quem seguir</h2>
//       <div className='flex flex-col gap-4 p-6 pt-0'>
//         {user ? (
//           user?.length > 0 ? (
//             <div>
//               {user.map(user => (
//                 <RecommendationItem user={user} />
//               ))}
//             </div>
//           ) : (
//             ''
//           )
//         ) : (
//           <RecommendationItemSkeleton />
//         )}
//       </div>
//     </div>
//   );
// };
