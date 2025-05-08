
export default function InteractiveServicesPage({ services, profile }) {
    return (
      <div>
        <h2>Profile</h2>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
  
        <h2>Services</h2>
        {services.map((service) => (
          <div key={service.id}>
            <p>Title: {service.title}</p>
            <p>Location: {service.location}</p>
          </div>
        ))}
      </div>
    );
  }