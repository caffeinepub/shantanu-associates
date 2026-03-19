import Array "mo:core/Array";
import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  // Contact Submission Type and Compare
  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compare(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  // Map for Contact Submissions
  var submissionIdCounter = 0;
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();

  // Testimonial Type and Compare
  type Testimonial = {
    clientName : Text;
    role : Text;
    content : Text;
  };

  module Testimonial {
    public func compare(a : Testimonial, b : Testimonial) : Order.Order {
      switch (Text.compare(a.clientName, b.clientName)) {
        case (#equal) { Text.compare(a.role, b.role) };
        case (other) { other };
      };
    };
  };

  // Array for Testimonials
  var testimonials : [Testimonial] = [
    {
      clientName = "Mr. Ramesh Shah";
      role = "Promoter & Developer, Rohan Lifescapes";
      content = "Shantanu is one of the best architects, especially in retro-fitting. He is a cut above most architects.";
    },
    {
      clientName = "Mr. Arvind Goenka";
      role = "CMD, Bengal NRI Complex Ltd.";
      content = "Shantanu brings great value to any architectural project.";
    },
  ];

  // Public methods

  // Contact Form Submission
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    let newSubmission : ContactSubmission = {
      name;
      email;
      phone;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(submissionIdCounter, newSubmission);
    submissionIdCounter += 1;
  };

  // Retrieve all contact submissions
  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray().sort();
  };

  // Add new testimonial (for future admin use)
  public shared ({ caller }) func addTestimonial(clientName : Text, role : Text, content : Text) : async () {
    let newTestimonial : Testimonial = {
      clientName;
      role;
      content;
    };
    testimonials := testimonials.concat([newTestimonial]);
  };

  // Get all testimonials
  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.sort();
  };
};
