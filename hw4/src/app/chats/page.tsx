import React from 'react';

function ChatsPage() {
	return (
		<>
			<h1>ChatsPage</h1>
			{Array.from({ length: 100 }, (_, i) => (
				<div key={i} className="w-full border">
					Content {i}
				</div>
			))}
		</>
	);
}

export default ChatsPage;
