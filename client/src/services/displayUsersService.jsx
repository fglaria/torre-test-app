
export const show = (usersResult) => {
  console.log(usersResult);
  return (
    <div class="mt-3 mb-5">
      {
        usersResult.results.map((u, index) => 
          <div key={ index }>
            <p>{ u.username }</p>
          </div>
        )
      }
    </div>
  );
};
